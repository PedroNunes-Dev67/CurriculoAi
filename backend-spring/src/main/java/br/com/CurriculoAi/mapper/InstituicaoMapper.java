package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.InstituicaoDtoResponse;
import br.com.CurriculoAi.entities.Instituicao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstituicaoMapper {

    InstituicaoDtoResponse toDto(Instituicao instituicao);
}
