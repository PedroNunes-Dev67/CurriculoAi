package br.com.CurriculoAi.DTO.response;

import java.util.List;

public record UsuarioFullContentDtoResponse(
        UsuarioDtoResponse usuario,
        AreaUserDTOResponse area,
        List<FormacaoDtoResponse> formacoes
) {
}
