package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCurso;

    @OneToMany(mappedBy = "curso")
    @Builder.Default
    private List<FormacaoUser> formacoes = new ArrayList<>();
}
