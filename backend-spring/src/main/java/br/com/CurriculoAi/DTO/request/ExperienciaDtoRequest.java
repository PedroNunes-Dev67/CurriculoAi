package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record ExperienciaDtoRequest(
        Long id_area,
        Long id_empresa,
        LocalDate dataInicio,
        String cargo,
        LocalDate dataFim,
        String descriacao,
        Boolean trabalhoAtual
) {
}
