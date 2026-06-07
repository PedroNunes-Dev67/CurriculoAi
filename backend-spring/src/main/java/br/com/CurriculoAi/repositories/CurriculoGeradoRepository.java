package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.CurriculoGerado;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculoGeradoRepository extends JpaRepository<CurriculoGerado, Long> {

    List<CurriculoGerado> findByUsuario(UsuarioCad usuario);
}