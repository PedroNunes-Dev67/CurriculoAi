package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name = "experiencia_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExperienciaUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_experiencia")
    private Long id;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String empresa;

    @Column(name= "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private String cargo;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(nullable = false)
    private String habilidades;

    @Column(name = "trabalho_atual")
    private Boolean trabalhoAtual;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;


}
