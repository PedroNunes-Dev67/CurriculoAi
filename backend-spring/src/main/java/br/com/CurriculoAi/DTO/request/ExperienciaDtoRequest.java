package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record ExperienciaDtoRequest(
        String area,
        String empresa,
        LocalDate dataInicio,
        String cargo,
        LocalDate dataFim,
        String descriacao,
        Boolean trabalhoAtual
) {
}
