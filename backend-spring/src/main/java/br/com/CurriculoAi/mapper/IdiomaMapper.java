package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.IdiomaDtoResponse;
import br.com.CurriculoAi.entities.Idioma;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IdiomaMapper {

    IdiomaDtoResponse toDto(Idioma idioma);
}
