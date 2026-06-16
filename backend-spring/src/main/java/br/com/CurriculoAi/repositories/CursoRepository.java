package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
