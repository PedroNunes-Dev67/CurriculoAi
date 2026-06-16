package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "avaliacao_curriculo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvaliacaoCurriculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private Long id;

    @Column(nullable = false)

    private Integer score;

    @Column(name = "pontos_fortes", nullable = false)
    private String pontosFortes;

    @Column(name = "pontos_fracos", nullable = false)
    private String pontosFracos;

    @Column(nullable = false)
    private String recomendacoes;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private UsuarioCad usuarioCad;

}
