package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.DisponibilidadeUserDtoResponse;
import br.com.CurriculoAi.entities.DisponibilidadeUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DisponibilidadeMapper {

    DisponibilidadeUserDtoResponse toDto(DisponibilidadeUser disponibilidadeUser);
}
