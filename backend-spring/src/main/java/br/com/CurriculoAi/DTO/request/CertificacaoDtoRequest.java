package br.com.CurriculoAi.DTO.request;

import java.time.LocalDate;

public record CertificacaoDtoRequest(
        String nomeCertificacao,
        Long id_instituicao,
        LocalDate dataConclusao,
        byte[] certificado
) {
}
