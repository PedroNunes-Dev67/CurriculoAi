package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaUserRepository extends JpaRepository<Area, Long> {
}
