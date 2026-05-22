package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.AreaUserDTOResponse;
import br.com.CurriculoAi.entities.Area;
import org.mapstruct.Mapping;

public interface AreaUserMapper {

        @Mapping(target = "area", ignore = true)
        AreaUserDTOResponse toDTO(Area entity);


    }
