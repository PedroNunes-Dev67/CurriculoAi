package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.CertificacaoUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificacaoUserRepository extends JpaRepository<CertificacaoUser, Long>{
}
