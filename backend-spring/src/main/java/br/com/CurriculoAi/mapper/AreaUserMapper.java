package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.AreaDTOResponse;
import br.com.CurriculoAi.entities.Area;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AreaUserMapper {

        AreaDTOResponse toDTO(Area area);
}
