package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.IdiomasUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdiomasUserRepository extends JpaRepository<IdiomasUser, Long> {
}
