package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.DisponibilidadeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisponibilidadeUserRepository extends JpaRepository <DisponibilidadeUser, Long>{
}
