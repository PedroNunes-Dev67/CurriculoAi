package br.com.CurriculoAi.DTO.response;


public record IdiomaUserDtoResponse(
        Long id,
        String nivel,
        IdiomaDtoResponse idioma
) {
}
