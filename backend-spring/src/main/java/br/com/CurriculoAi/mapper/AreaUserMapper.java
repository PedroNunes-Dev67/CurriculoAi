package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.AreaUserDTO;
import br.com.CurriculoAi.entities.AreaUser;
import org.mapstruct.Mapping;

public interface AreaUserMapper {

        @Mapping(target = "area", ignore = true)
        AreaUserDTO toDTO(AreaUser entity);


    }
