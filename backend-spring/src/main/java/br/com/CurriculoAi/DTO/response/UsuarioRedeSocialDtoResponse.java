package br.com.CurriculoAi.DTO.response;

public record UsuarioRedeSocialDtoResponse(
        Long id,
        String link,
        RedeSocialDtoResponse redeSocial
) {
}
