package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.UsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.LoginDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.Role;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.RoleRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import br.com.CurriculoAi.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UsuarioService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioMapper mapper;
    private final AreaUserRepository areaUserRepository;
    private final UsuarioCadRepository repository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final RoleRepository roleRepository;
    private final TokenIdentificacaoUsuarioService tokenIdentificacaoUsuarioService;

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class.getName());

    public UsuarioCad findByid(Long id) {

        logger.info("Procurando o usuario pelo id: {}", id);

        UsuarioCad entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não foi encontrado no sistema"));

        logger.info("Usuário encontrado!");
        return entity;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto createUsuario(UsuarioDtoRequest usuarioCadDTO) {

        logger.info("Iniciando o processo de criação de usuario");

        //Registra como ROLE_CANDIDATO TODO: VER DEPOIS COMO UTILIZAR DE RECRUTADOR
        Role role = roleRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Role não encontrada"));


        var entity = UsuarioCad.builder()
                .nome(usuarioCadDTO.nome())
                .senha(passwordEncoder.encode(usuarioCadDTO.senha()))
                .email(usuarioCadDTO.email())
                .build();

        entity.getRoles().add(role);

        UsuarioCad savedEntity = repository.save(entity);

        String tokenDeIdentificacao = tokenIdentificacaoUsuarioService.gerarTokenDeIdentificacao(savedEntity);

        UsuarioTokenIdentResponseDto responseDto = new UsuarioTokenIdentResponseDto(savedEntity.getId(), savedEntity.getNome(), tokenDeIdentificacao);

        logger.info("Usuário criado com sucesso! Id: {}", savedEntity.getId());

        return responseDto;

    }

    public String login(LoginDtoResponse loginDtoResponse){

        logger.info("Iniando método de Login do usuário...");

        var usernamepasswor = new UsernamePasswordAuthenticationToken(loginDtoResponse.email(), loginDtoResponse.senha());

        var authentication = authenticationManager.authenticate(usernamepasswor);

        UsuarioCad usuarioAutenticado = (UsuarioCad) authentication.getPrincipal();

        String token = tokenService.gerarToken(usuarioAutenticado);

        logger.info("Login efetuado com sucesso!");

        return token;
    }

    @Transactional
    public void deleteUser(Long id) {

        logger.info("Iniciando método de deletar usuario...");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não foi encontrado no sistema"));

        logger.info("Usuário deletado com sucesso!");

         repository.delete(entity);
    }

    public UsuarioFullContentDtoResponse me() {

        logger.info("Iniando método de construção dos dados do usuário para retorno através do JWT");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado");
        }

        Object principal = authentication.getPrincipal();
        UsuarioCad usuarioAutenticado;

        logger.warn("Resgatar usuário através do subject do JWT efetuado com sucesso!");

        if (principal instanceof UsuarioCad) {
            usuarioAutenticado = (UsuarioCad) principal;

        } else if (principal instanceof UserDetails) {

            String email = ((UserDetails) principal).getUsername();

            usuarioAutenticado = repository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        } else if (principal instanceof String) {

            String p = (String) principal;

            // anonymousUser é a principal padrão do Spring para auth anônima
            if ("anonymousUser".equals(p)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário anônimo");
            }

            // se for username/email, tenta buscar no banco
            usuarioAutenticado = repository.findByEmail(p)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        } else {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Tipo de principal inesperado: " +
                            (principal == null ? "null" : principal.getClass().getName())
            );
        }

        UsuarioCad usuarioBuscado = repository.findById(usuarioAutenticado.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        logger.info("Usuário encontrado com sucesso, iniciando processo de construção do DTO...");

        return mapper.toFullContentDto(usuarioBuscado);
    }
}
