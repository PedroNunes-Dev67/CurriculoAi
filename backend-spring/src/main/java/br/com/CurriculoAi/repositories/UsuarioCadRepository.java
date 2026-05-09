package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.UsuarioCad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioCadRepository extends JpaRepository<UsuarioCad, Long> {
}
