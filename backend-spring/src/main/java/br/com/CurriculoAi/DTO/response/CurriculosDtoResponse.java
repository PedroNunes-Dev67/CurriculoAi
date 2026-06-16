package br.com.CurriculoAi.DTO.response;

import java.time.LocalDateTime;

public record CurriculosDtoResponse(
        String area,
        byte[] curriculo,
        LocalDateTime dataCriacao,
        LocalDateTime ultimaAtualizacao
) {
}
