package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.CurriculoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculoUsuarioRepository extends JpaRepository<CurriculoUsuario, Long> {

    List<CurriculoUsuario> findByUsuario(UsuarioCad usuario);
}