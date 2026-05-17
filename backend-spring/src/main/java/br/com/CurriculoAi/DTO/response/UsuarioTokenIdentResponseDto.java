package br.com.CurriculoAi.DTO.response;

public record UsuarioTokenIdentResponseDto(
        Long id,
        String nome, //Nome do usuário
        String token //Token de identificação
) {
}
