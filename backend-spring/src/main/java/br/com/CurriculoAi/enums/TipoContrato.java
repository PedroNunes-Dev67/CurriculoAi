package br.com.CurriculoAi.enums;

public enum TipoContrato {
    PJ("PJ"),
    CLT("CLT");

    private String tipo;

    TipoContrato(String tipo) {
        this.tipo = tipo;
    }

    public static TipoContrato from(String tipoBuscado){

        TipoContrato tipoContrato = null;

        for (TipoContrato t : values()){
            if (t.tipo.equalsIgnoreCase(tipoBuscado)){
                tipoContrato = t;
            }
        }

        if (tipoContrato == null) throw new IllegalArgumentException("Tipo de contrado inválido");

        return tipoContrato;
    }
}
