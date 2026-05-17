package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.AreaUserDTOResponse;
import br.com.CurriculoAi.entities.AreaUser;
import org.mapstruct.Mapping;

public interface AreaUserMapper {

        @Mapping(target = "area", ignore = true)
        AreaUserDTOResponse toDTO(AreaUser entity);


    }
