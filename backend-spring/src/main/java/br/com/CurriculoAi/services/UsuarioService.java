package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.UsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.*;
import br.com.CurriculoAi.entities.Role;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.RoleRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import br.com.CurriculoAi.security.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UsuarioService {

    private Logger logger = Logger.getLogger(UsuarioService.class.getName());

    private final PasswordEncoder passwordEncoder;


    private final UsuarioMapper mapper;

    private final AreaUserRepository areaUserRepository;

    private final UsuarioCadRepository repository;

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    private final RoleRepository roleRepository;

    private final TokenIdentificacaoUsuarioService tokenIdentificacaoUsuarioService;

    public UsuarioService(PasswordEncoder passwordEncoder, UsuarioMapper mapper, AreaUserRepository areaUserRepository, UsuarioCadRepository repository, AuthenticationManager authenticationManager, TokenService tokenService, RoleRepository roleRepository, TokenIdentificacaoUsuarioService tokenIdentificacaoUsuarioService) {
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
        this.areaUserRepository = areaUserRepository;
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.roleRepository = roleRepository;
        this.tokenIdentificacaoUsuarioService = tokenIdentificacaoUsuarioService;
    }

    public UsuarioCad findByid(Long id) {

        logger.info("Procurando o usuario pelo id");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não foi encontrado no sistema"));
        return entity;
    }


    public UsuarioTokenIdentResponseDto createUsuario(UsuarioDtoRequest usuarioCadDTO) {

        logger.info("Criando o usuario");

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

        return responseDto;

    }

    public String login(LoginDtoResponse loginDtoResponse){

        var usernamepasswor = new UsernamePasswordAuthenticationToken(loginDtoResponse.email(), loginDtoResponse.senha());

        var authentication = authenticationManager.authenticate(usernamepasswor);

        UsuarioCad usuarioAutenticado = (UsuarioCad) authentication.getPrincipal();

        String token = tokenService.gerarToken(usuarioAutenticado);

        return token;
    }


    public void deleteUser(Long id) {

        logger.info("Deletando o usuario");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não foi encontrado no sistema"));

         repository.delete(entity);
    }

    public UsuarioFullContentDtoResponse me(){

        UsuarioCad usuarioAutenticado = (UsuarioCad) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UsuarioCad usuarioBuscado = repository.findById(usuarioAutenticado.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        UsuarioFullContentDtoResponse usuarioFullContentDtoResponse = mapper.toFullContentDto(usuarioBuscado);

        return usuarioFullContentDtoResponse;
    }
}
