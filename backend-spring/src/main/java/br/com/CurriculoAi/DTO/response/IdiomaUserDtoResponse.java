package br.com.CurriculoAi.DTO.response;

import br.com.CurriculoAi.entities.IdiomasUser;

public record IdiomaUserDtoResponse(
        Long id,
        IdiomasUser idioma
) {
}
