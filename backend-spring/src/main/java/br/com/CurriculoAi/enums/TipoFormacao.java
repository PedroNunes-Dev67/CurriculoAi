package br.com.CurriculoAi.enums;

public enum TipoFormacao {

    // Ensino básico
    ENSINO_FUNDAMENTAL("Ensino Fundamental"),
    ENSINO_MEDIO("Ensino Médio"),
    ENSINO_MEDIO_TECNICO("Ensino Médio Técnico"),

    // Superior
    TECNOLOGO("Tecnólogo"),
    GRADUAÇÃO("Graduação"),
    BACHARELADO("Bacharelado"),
    LICENCIATURA("Licenciatura"),

    // Pós-graduação lato sensu
    ESPECIALIZAÇÃO("Especialização"),
    MBA("MBA"),
    RESIDENCIA("Residência"),

    // Pós-graduação stricto sensu
    MESTRADO("Mestrado"),
    MESTRADO_PROFISSIONAL("Mestrado Profissional"),
    DOUTORADO("Doutorado"),
    POS_DOUTORADO("Pós-Doutorado"),
    POS_GRADUAÇÃO("Pós-Graduação"),

    // Outros
    CERTIFICACAO_TECNICA("Certificação Técnica"),
    CURSO_LIVRE("Curso Livre"),
    AUTODIDATA("Autodidata"),
    OUTRO("Outro");

    private final String descricao;

    TipoFormacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static TipoFormacao from(String tipo) {
        if (tipo == null) return null;

        for (TipoFormacao formacao : values()) {
            if (formacao.name().equals(tipo.toUpperCase())) {
                return formacao;
            }
        }

        throw new IllegalArgumentException("Tipo de formação inválido: " + tipo);
    }
}
