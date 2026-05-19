package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record FormacaoDtoRequest(
        String area,
        String tipoFormacao,
        LocalDate dataInicio,
        LocalDate dataConclusao,
        Boolean emAndamento
) {
}
