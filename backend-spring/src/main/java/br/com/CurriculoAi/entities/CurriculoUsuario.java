package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "curriculo_usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurriculoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curriculo")
    private Long id;

    private String titulo;

    @Column(name = "data_criacao")
    @CreationTimestamp
    private LocalDateTime dataCriacao;

    @Column(name = "ultima_atualizacao")
    @UpdateTimestamp
    private LocalDateTime ultimaAtualizacao;

    @Lob
    private byte[] curriculo;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuarioCad usuarioCad;
}
