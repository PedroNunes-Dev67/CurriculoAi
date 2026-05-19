package br.com.CurriculoAi.repositories;

import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenIdentificacaoUsurioRepository extends JpaRepository<TokenIdentificacaoUsuario, Long> {

    void deleteByUsuarioCad(UsuarioCad usuarioCad);

    Optional<TokenIdentificacaoUsuario> findByToken(String token);
}
