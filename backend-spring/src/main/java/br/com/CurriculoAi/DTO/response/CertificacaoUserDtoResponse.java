package br.com.CurriculoAi.DTO.response;

import java.time.LocalDate;

public record CertificacaoUserDtoResponse(
        Long id,
        InstituicaoDtoResponse instituicao,
        LocalDate dataConclusao,
        Boolean emAndamento
) {
}
