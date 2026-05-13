package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioCad toEntity(UsuarioCadDTO dto);

    UsuarioCadDTO toDTO(UsuarioCad entity);
}