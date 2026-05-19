package br.com.CurriculoAi.DTO.response;

import java.time.LocalDate;

public record FormacaoDtoResponse(
        Long id,
        String area,
        String tipoFormacao,
        LocalDate dataInicio,
        LocalDate dataConclusao,
        Boolean emAndamento,
        UsuarioDtoResponse usuario
) {
}
