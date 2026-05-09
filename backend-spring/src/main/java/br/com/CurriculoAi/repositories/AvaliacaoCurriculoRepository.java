package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.AvaliacaoCurriculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvaliacaoCurriculoRepository extends JpaRepository<AvaliacaoCurriculo, Long> {
}
