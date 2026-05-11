package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.AreaUser;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class UsuarioService {

    private Logger logger = Logger.getLogger(UsuarioService.class.getName());

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UsuarioMapper mapper;

    @Autowired
    AreaUserRepository areaUserRepository;

    @Autowired
    UsuarioCadRepository repository;

    public UsuarioCad findByid(Long id) {

        logger.info("Procurando o usuario pelo id");

        var entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));;
        return entity;
    }


    public UsuarioCadDTO createUsuario(UsuarioCadDTO usuarioCadDTO) {

        logger.info("Criando o usuario");

        if (usuarioCadDTO.getAreaId() == null) {
            throw new RuntimeException("AreaId não pode ser null");
        }

        AreaUser area = areaUserRepository.findById(usuarioCadDTO.getAreaId())
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));


        var entity = UsuarioCad.builder()
                .nome(usuarioCadDTO.getNome())
                .senha(passwordEncoder.encode(usuarioCadDTO.getSenha()))
                .email(usuarioCadDTO.getEmail())
                .id(usuarioCadDTO.getId())
                .area(area).build();

        UsuarioCad savedEntity = repository.save(entity);

        return mapper.toDTO(savedEntity);

    }

}
