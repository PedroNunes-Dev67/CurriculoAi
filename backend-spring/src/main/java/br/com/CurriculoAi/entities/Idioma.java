package br.com.CurriculoAi.entities;

import br.com.CurriculoAi.enums.IdiomaEnum;
import jakarta.persistence.*;

@Entity
@Table
public class Idioma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IdiomaEnum idioma;

}
