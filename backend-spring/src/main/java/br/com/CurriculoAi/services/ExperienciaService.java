package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.ExperienciaDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.ExperienciaUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.ExperienciaUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienciaService {

    private final ExperienciaUserRepository experienciaUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;

    public ExperienciaService(ExperienciaUserRepository experienciaUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository) {
        this.experienciaUserRepository = experienciaUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarExperiencias(List<ExperienciaDtoRequest> experiencias, String token){

        if (experiencias.isEmpty()) throw new ListIsEmptyException("Lista de experiências vazia");

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encotrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        List<ExperienciaUser> experienciasSalvas = experiencias
                .stream()
                .map(experiencia -> {

                    return new ExperienciaUser(
                            null,
                            experiencia.area(),
                            experiencia.empresa(),
                            experiencia.dataInicio(),
                            experiencia.cargo(),
                            experiencia.dataFim(),
                            experiencia.descriacao(),
                            experiencia.trabalhoAtual(),
                            usuario
                    );
                })
                .toList();

        experienciaUserRepository.saveAll(experienciasSalvas);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), token);
    }
}
