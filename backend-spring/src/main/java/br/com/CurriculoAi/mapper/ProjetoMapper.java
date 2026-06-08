package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.ProjetoDtoResponse;
import br.com.CurriculoAi.entities.Projeto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjetoMapper {

    ProjetoDtoResponse toDto(Projeto projeto);
}
