package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.IdiomaUserDtoResponse;
import br.com.CurriculoAi.entities.IdiomasUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IdiomaMapper {

    IdiomaUserDtoResponse toDto(IdiomasUser idiomasUser);
}
