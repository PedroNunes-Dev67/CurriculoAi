package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "certificacao_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CertificacaoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_plataforma", nullable = false, length = 80)
    private String nomePlataforma;

    @Lob //avisa ao hibernate que é um largeObject
    @Column(name = "certificado", nullable = false)
    private byte[] certificado;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;
}
