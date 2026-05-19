package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
