package br.com.CurriculoAi.DTO.response;

import java.time.LocalDate;

public record ExperienciaUserDtoResponse(
        Long id,
        AreaDTOResponse area,
        EmpresaDtoResponse empresa,
        LocalDate dataInicio,
        String cargo,
        LocalDate dataFim,
        String descricao,
        Boolean trabalhoAtual
) {
}
