package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "rede_social")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RedeSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_rede_social", nullable = false)
    private String nome;
}
