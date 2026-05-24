package br.com.CurriculoAi.entities;

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

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuarioCad usuario;

    @ManyToOne
    @JoinColumn(name = "id_idioma")
    private Idioma idioma;
}
