package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record FormacaoDtoRequest(
        Long id_curso,
        String tipoFormacao,
        LocalDate dataInicio,
        LocalDate dataConclusao,
        Boolean emAndamento
) {
}
