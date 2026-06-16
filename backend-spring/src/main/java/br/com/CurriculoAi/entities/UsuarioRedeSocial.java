package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "usuario_rede_social")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRedeSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String link;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuarioCad usuario;

    @ManyToOne
    @JoinColumn(name = "id_rede_social")
    private RedeSocial redeSocial;
}
