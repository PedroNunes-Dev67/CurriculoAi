package br.com.CurriculoAi.enums;

public enum NivelIdioma {

    BASICO("Básico"),
    INTERMEDIARIO("Intermediário"),
    AVANCADO("Avançado"),
    FLUENTE("Fluente"),
    NATIVO("Nativo");

    private final String descricao;

    NivelIdioma(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static NivelIdioma from(String nivel) {
        if (nivel == null) return null;

        for (NivelIdioma nivelIdioma : values()) {
            if (nivelIdioma.name().equals(nivel.toUpperCase())) {
                return nivelIdioma;
            }
        }

        throw new IllegalArgumentException("Nível de idioma inválido: " + nivel);
    }
}
