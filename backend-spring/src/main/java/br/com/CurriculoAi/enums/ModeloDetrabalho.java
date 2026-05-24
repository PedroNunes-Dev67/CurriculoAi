package br.com.CurriculoAi.enums;

public enum ModeloDetrabalho {
    PRESENCIAL("PRESENCIAL"),
    REMOTO("REMOTO"),
    HIBRIDO("HIBRIDO");

    private String tipo;

    ModeloDetrabalho(String tipo) {
        this.tipo = tipo;
    }

    public static ModeloDetrabalho from(String tipoBuscado){

        ModeloDetrabalho modeloDetrabalho = null;

        for (ModeloDetrabalho m : values()){
            if (m.tipo.equalsIgnoreCase(tipoBuscado)){
                modeloDetrabalho = m;
            }
        }

        if (modeloDetrabalho == null) throw new IllegalArgumentException("Tipo de modelo de trabalho não encontrado");

        return modeloDetrabalho;
    }
}
