package br.com.CurriculoAi.DTO.response;

import br.com.CurriculoAi.enums.ModeloDeTrabalho;

import java.time.LocalDate;

public record DisponibilidadeUserDtoResponse(
        Long id,
        LocalDate disponibilidadeInicio,
        ModeloDeTrabalho modeloTrabalho
) {
}
