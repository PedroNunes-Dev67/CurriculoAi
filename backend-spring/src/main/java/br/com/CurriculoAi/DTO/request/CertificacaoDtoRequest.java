package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record CertificacaoDtoRequest(
        String nomeCertificacao,
        String instituicao,
        LocalDate dataConclusao,
        byte[] certificado
) {
}
