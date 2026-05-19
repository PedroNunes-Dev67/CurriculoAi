package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "area_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AreaUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_area")
    private Long id;

    @Column(name = "nome_area", nullable = false)
    private String nomeArea;

}
