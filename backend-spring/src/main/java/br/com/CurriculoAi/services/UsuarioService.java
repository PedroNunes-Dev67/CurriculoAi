package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.LoginDto;
import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.AreaUser;
import br.com.CurriculoAi.entities.Role;
import br.com.CurriculoAi.entities.UsuarioCad;
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

    public UsuarioService(PasswordEncoder passwordEncoder, UsuarioMapper mapper, AreaUserRepository areaUserRepository, UsuarioCadRepository repository, AuthenticationManager authenticationManager, TokenService tokenService, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
        this.areaUserRepository = areaUserRepository;
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.roleRepository = roleRepository;
    }

    public UsuarioCad findByid(Long id) {

        logger.info("Procurando o usuario pelo id");

        var entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));
        return entity;
    }


    public UsuarioCadDTO createUsuario(UsuarioCadDTO usuarioCadDTO) {

        logger.info("Criando o usuario");

        if (usuarioCadDTO.areaId() == null) {
            throw new RuntimeException("AreaId não pode ser null");
        }

        //Busca o id no banco para ver se existe
        AreaUser area = areaUserRepository.findById(usuarioCadDTO.areaId())
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));

        Role role = roleRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Role não encontrada"));


        var entity = UsuarioCad.builder()
                .nome(usuarioCadDTO.nome())
                .senha(passwordEncoder.encode(usuarioCadDTO.senha()))
                .email(usuarioCadDTO.email())
                .id(usuarioCadDTO.id())
                .area(area)
                .build();

        entity.getRoles().add(role);

        UsuarioCad savedEntity = repository.save(entity);

        return mapper.toDto(savedEntity);

    }

    public String login(LoginDto loginDto){

        var usernamepasswor = new UsernamePasswordAuthenticationToken(loginDto.email(),loginDto.senha());

        var authentication = authenticationManager.authenticate(usernamepasswor);

        UsuarioCad usuarioAutenticado = (UsuarioCad) authentication.getPrincipal();

        String token = tokenService.gerarToken(usuarioAutenticado);

        return token;
    }

    public UsuarioCadDTO updateUsuario(UsuarioCadDTO usuarioCadDTO) {

       var entity = repository.findById(usuarioCadDTO.id())
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));

       // verifica se a senha não chegou vazia
        if (usuarioCadDTO.senha() != null &&
                !usuarioCadDTO.senha().isBlank()) {

            entity.setSenha(
                    passwordEncoder.encode(usuarioCadDTO.senha())
            );
        }

       //busca area no banco
        AreaUser area = areaUserRepository.findById(usuarioCadDTO.areaId())
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));

                entity.setNome(usuarioCadDTO.nome());
                entity.setSenha(passwordEncoder.encode(usuarioCadDTO.senha()));
                entity.setEmail(usuarioCadDTO.email());
                entity.setArea(area);

        UsuarioCad savedEntity = repository.save(entity);

        return mapper.toDto(savedEntity);

    }

    public void deleteUser(Long id) {

        logger.info("Deletando o usuario");

        var entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));

         repository.delete(entity);
    }

    public UsuarioCadDTO me(){

        UsuarioCad usuarioAutenticado = (UsuarioCad) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UsuarioCad usurioBuscado = repository.findById(usuarioAutenticado.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return mapper.toDto(usurioBuscado);
    }

}
