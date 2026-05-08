package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "disponibilidade")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisponibilidadeUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "disponibilidade_init", nullable = false)
    private LocalDate disponibilidadeInicio;

    @Column(name = "carga_horaria", nullable = false)
    private Integer cargaHoraria;

    private Boolean remoto;

    @Column(name = "tipo_contrato", nullable = false)
    private String tipoContrato;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;

}
