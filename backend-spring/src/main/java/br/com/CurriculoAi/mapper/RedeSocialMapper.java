package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.RedeSocialDtoResponse;
import br.com.CurriculoAi.entities.RedeSocial;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RedeSocialMapper {

    RedeSocialDtoResponse toDto(RedeSocial redeSocial);
}
