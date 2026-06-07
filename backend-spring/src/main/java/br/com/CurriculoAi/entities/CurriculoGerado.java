package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "curriculo_gerado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurriculoGerado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pdf", nullable = false, columnDefinition = "BINARY LARGE OBJECT")
    private byte[] pdf;

    @Column(name = "data_geracao", nullable = false)
    private LocalDateTime dataGeracao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private UsuarioCad usuario;
}