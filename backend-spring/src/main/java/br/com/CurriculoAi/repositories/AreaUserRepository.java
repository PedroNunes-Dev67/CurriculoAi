package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.AreaUser;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaUserRepository extends JpaRepository<AreaUser, Long> {
}
