package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.response.CursoDtoResponse;
import br.com.CurriculoAi.entities.Curso;
import br.com.CurriculoAi.repositories.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;

    private static final Logger logger = LoggerFactory.getLogger(CursoService.class);

    public List<CursoDtoResponse> findAll(){

        logger.info("Buscando cursos...");

        List<Curso> cursosBuscados = cursoRepository.findAll();

        logger.info("Cursos buscados, com um total de: {}", cursosBuscados.size());

        return cursosBuscados
                .stream()
                .map(curso -> {
                    return new CursoDtoResponse(curso.getId(), curso.getNomeCurso());
                })
                .toList();
    }
}
