package br.com.CurriculoAi.DTO.response;

import java.time.LocalDate;

public record FormacaoUserDtoResponse(
        Long id,
        AreaDTOResponse area,
        String tipoFormacao,
        LocalDate dataInicio,
        LocalDate dataConclusao,
        Boolean emAndamento
) {
}
