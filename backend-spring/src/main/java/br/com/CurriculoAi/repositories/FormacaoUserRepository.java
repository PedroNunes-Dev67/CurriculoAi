package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.FormacaoUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormacaoUserRepository extends JpaRepository<FormacaoUser, Long> {
}
