package br.com.CurriculoAi.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioCadDTO {

    private Long id;

    private String nome;

    private String senha;

    private String email;

    private Long areaId;
}
