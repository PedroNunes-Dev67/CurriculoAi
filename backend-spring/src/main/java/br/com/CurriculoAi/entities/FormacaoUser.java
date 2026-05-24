package br.com.CurriculoAi.entities;

import br.com.CurriculoAi.enums.TipoFormacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "formacao_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormacaoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "area", nullable = false)
    private Area area;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_formacao", nullable = false, length = 80)
    private TipoFormacao tipoFormacao;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_conclusao")
    private LocalDate dataConclusao;

    @Column(name = "em_andamento")
    private Boolean emAndamento;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;
}

