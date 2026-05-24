package br.com.CurriculoAi.DTO.response;

import java.util.List;

public record UsuarioFullContentDtoResponse(
        UsuarioCadDtoResponse usuario,
        AreaDTOResponse area,
        List<FormacaoUserDtoResponse> formacoes,
        List<ExperienciaUserDtoResponse> experiencias,
        List<CertificacaoUserDtoResponse> certificoes,
        DisponibilidadeUserDtoResponse disponibilidade,
        List<IdiomaUserDtoResponse> idiomas
) {
}
