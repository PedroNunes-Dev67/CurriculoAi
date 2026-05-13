package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.AreaUser;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
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

        //Busca o id no banco para ver se existe
        AreaUser area = areaUserRepository.findById(usuarioCadDTO.getAreaId())
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));


        var entity = UsuarioCad.builder()
                .nome(usuarioCadDTO.getNome())
                .senha(passwordEncoder.encode(usuarioCadDTO.getSenha()))
                .email(usuarioCadDTO.getEmail())
                .id(usuarioCadDTO.getId())
                .area(area)
                .build();

        UsuarioCad savedEntity = repository.save(entity);

        return mapper.toDTO(savedEntity);

    }

    public UsuarioCadDTO updateUsuario(UsuarioCadDTO usuarioCadDTO) {

       var entity = repository.findById(usuarioCadDTO.getId())
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));

       // verifica se a senha não chegou vazia
        if (usuarioCadDTO.getSenha() != null &&
                !usuarioCadDTO.getSenha().isBlank()) {

            entity.setSenha(
                    passwordEncoder.encode(usuarioCadDTO.getSenha())
            );
        }

       //busca area no banco
        AreaUser area = areaUserRepository.findById(usuarioCadDTO.getAreaId())
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));

                entity.setNome(usuarioCadDTO.getNome());
                entity.setSenha(passwordEncoder.encode(usuarioCadDTO.getSenha()));
                entity.setEmail(usuarioCadDTO.getEmail());
                entity.setArea(area);

        UsuarioCad savedEntity = repository.save(entity);

        return mapper.toDTO(savedEntity);

    }

    public void deleteUser(Long id) {

        logger.info("Deletando o usuario");

        var entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Esse id não foi encontrado no sistema"));

         repository.delete(entity);
    }


}
