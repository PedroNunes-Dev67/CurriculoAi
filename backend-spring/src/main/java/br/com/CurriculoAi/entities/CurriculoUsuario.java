package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "curriculo_usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurriculoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_curriculo;

    @Column(nullable = false)
    private String titulo;

    @Lob
    //usar apenas no h2
    @Column(name = "curriculo", nullable = false)
    // usar em prod
    //@Column(name = "curriculo", nullable = false, columnDefinition = "OID")
    private byte[] curriculo;

    @Column(name = "data_criacao", nullable = false)
    @CreationTimestamp
    private LocalDateTime dataGeracao;

    @UpdateTimestamp
    @Column(name = "ultima_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private UsuarioCad usuario;
}