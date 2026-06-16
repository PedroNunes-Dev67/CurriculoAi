package br.com.CurriculoAi.DTO;

import br.com.CurriculoAi.enums.IdiomaEnum;
import br.com.CurriculoAi.enums.ModeloDeTrabalho;
import br.com.CurriculoAi.enums.NivelIdioma;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CurriculoDTO {

    private Long idUsuario;
    private String nome;
    private String email;


    private Long idArea;
    private String nomeArea;

    private DisponibilidadeDTO disponibilidade;


    private List<FormacaoDTO> formacoes;


    private List<ExperienciaDTO> experiencias;


    private List<IdiomaDTO> idiomas;


    private List<CertificacaoDTO> certificacoes;


    private AvaliacaoDTO avaliacao;



    // Inner DTOs


    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DisponibilidadeDTO {
        private Long id;
        private LocalDate disponibilidadeInicio;
        private Integer cargaHoraria;
        private ModeloDeTrabalho modeloTrabalho;
        private String tipoContrato;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormacaoDTO {
        private Long id;
        private String area;
        private String tipoFormacao;
        private LocalDate dataInicio;
        private LocalDate dataConclusao;
        private Boolean emAndamento;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExperienciaDTO {
        private Long id;
        private String area;
        private String empresa;
        private String cargo;
        private LocalDate dataInicio;
        private LocalDate dataFim;
        private String habilidades;
        private Boolean trabalhoAtual;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IdiomaDTO {
        private Long id;
        private IdiomaEnum idioma;
        private NivelIdioma nivel;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CertificacaoDTO {
        private Long id;
        private String nomePlataforma;
        private byte[] certificado;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AvaliacaoDTO {
        private Long id;
        private Integer score;
        private String pontosFortes;
        private String pontosFracos;
        private String recomendacoes;
        private LocalDate dataAvaliacao;
    }
}