package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.response.InstituicaoDtoResponse;
import br.com.CurriculoAi.entities.Instituicao;
import br.com.CurriculoAi.repositories.InstituicaoRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InstituicaoService {

    private final InstituicaoRepository instituicaoRepository;
    private static final Logger logger = LoggerFactory.getLogger(InstituicaoService.class);

    public List<InstituicaoDtoResponse> findAll(){

        logger.info("Busncando instituições...");

        List<Instituicao> instituicoesBuscadas = instituicaoRepository.findAll();

        logger.info("Instituições buscadas, com um total de: {}", instituicoesBuscadas.size());

        return instituicoesBuscadas
                .stream()
                .map(instituicao -> {
                    return new InstituicaoDtoResponse(instituicao.getId(),instituicao.getNome());
                })
                .toList();
    }
}
