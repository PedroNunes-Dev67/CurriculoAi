package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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

    @Column(name = "nome_certificacao")
    private String nomeCertificacao;

    @ManyToOne
    @JoinColumn(name = "id_instituicao")
    private Instituicao instituicao;

    @Column(name = "data_de_conclusao")
    private LocalDate dataConclusao;

    @Lob //avisa ao hibernate que é um largeObject
    @Column(name = "certificado", nullable = false)
    private byte[] certificado;

    @Column(name = "em_andamento")
    private Boolean emAndamento;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsuarioCad usuarioCad;

    public void estaEmAndamento(){

        this.emAndamento = this.dataConclusao != null;
    }
}
