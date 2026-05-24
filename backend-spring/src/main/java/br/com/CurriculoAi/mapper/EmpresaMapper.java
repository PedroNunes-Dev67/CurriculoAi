package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.EmpresaDtoResponse;
import br.com.CurriculoAi.entities.Empresa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmpresaMapper {

    EmpresaDtoResponse toDto(Empresa empresa);
}
