package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.UsuarioDtoResponse;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDtoResponse toDto(UsuarioCad usuarioCad);
}
