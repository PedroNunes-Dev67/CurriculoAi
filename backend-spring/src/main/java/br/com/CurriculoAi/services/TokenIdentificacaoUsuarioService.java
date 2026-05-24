package br.com.CurriculoAi.services;

import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TokenIdentificacaoUsuarioService {

    private final TokenIdentificacaoUsurioRepository repository;

    public TokenIdentificacaoUsuarioService(TokenIdentificacaoUsurioRepository repository) {
        this.repository = repository;
    }

    public String gerarTokenDeIdentificacao(UsuarioCad usuario){

        //Deleto qualquer token relacionado ao usuário
        repository.deleteByUsuarioCad(usuario);

        //Gera um token baseado em UUID
        String token = UUID.randomUUID().toString();

        TokenIdentificacaoUsuario tokenNovo = new TokenIdentificacaoUsuario(
                null,
                token,
                usuario
        );

        repository.save(tokenNovo);

        return token;
    }
}
