package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "token_usuario")
public class TokenIdentificacaoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token")
    private Long id;
    private String token;

    @JoinColumn(name = "id_usuario")
    @OneToOne(fetch = FetchType.EAGER)
    private UsuarioCad usuarioCad;
}
