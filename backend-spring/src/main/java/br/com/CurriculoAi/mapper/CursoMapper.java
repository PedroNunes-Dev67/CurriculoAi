package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.CursoDtoResponse;
import br.com.CurriculoAi.entities.Curso;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CursoMapper {

    CursoDtoResponse toDto(Curso curso);
}
