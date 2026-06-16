package br.com.CurriculoAi.enums;

public enum ModeloDeTrabalho {
    PRESENCIAL("PRESENCIAL"),
    REMOTO("REMOTO"),
    HIBRIDO("HIBRIDO");

    private String tipo;

    ModeloDeTrabalho(String tipo) {
        this.tipo = tipo;
    }

    public static ModeloDeTrabalho from(String tipoBuscado){

        ModeloDeTrabalho modeloDetrabalho = null;

        for (ModeloDeTrabalho m : values()){
            if (m.tipo.equalsIgnoreCase(tipoBuscado)){
                modeloDetrabalho = m;
            }
        }

        if (modeloDetrabalho == null) throw new IllegalArgumentException("Tipo de modelo de trabalho não encontrado");

        return modeloDetrabalho;
    }
}
