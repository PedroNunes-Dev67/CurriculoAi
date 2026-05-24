package br.com.CurriculoAi.entities;

import br.com.CurriculoAi.enums.IdiomaEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Idioma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_idioma")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IdiomaEnum idioma;
}
