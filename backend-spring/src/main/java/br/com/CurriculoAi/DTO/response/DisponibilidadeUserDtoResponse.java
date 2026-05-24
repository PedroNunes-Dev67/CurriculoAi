package br.com.CurriculoAi.DTO.response;

import br.com.CurriculoAi.enums.ModeloDetrabalho;

import java.time.LocalDate;

public record DisponibilidadeUserDtoResponse(
        Long id,
        LocalDate disponibilidadeInicio,
        ModeloDetrabalho modeloTrabalho
) {
}
