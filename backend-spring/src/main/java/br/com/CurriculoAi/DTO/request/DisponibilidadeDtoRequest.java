package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record DisponibilidadeDtoRequest(
        LocalDate disponibilidadeInicio,
        String modeloTrabalho
) {
}
