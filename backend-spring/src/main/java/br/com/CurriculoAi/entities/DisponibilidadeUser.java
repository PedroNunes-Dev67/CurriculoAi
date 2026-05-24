package br.com.CurriculoAi.entities;

import br.com.CurriculoAi.enums.ModeloDeTrabalho;
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
    @Column(name = "id_disponibilidade")
    private Long id;

    @Column(name = "disponibilidade_init", nullable = false)
    private LocalDate disponibilidadeInicio;

    @Enumerated(EnumType.STRING)
    @Column(name = "modelo_trabalho", nullable = false)
    private ModeloDeTrabalho modeloTrabalho;

    @OneToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;
}
