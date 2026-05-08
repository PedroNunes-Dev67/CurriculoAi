package br.com.CurriculoAi.entities;

import br.com.CurriculoAi.enums.Idioma;
import br.com.CurriculoAi.enums.NivelIdioma;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "idiomas_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IdiomasUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelIdioma nivel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Idioma idioma;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;

}
