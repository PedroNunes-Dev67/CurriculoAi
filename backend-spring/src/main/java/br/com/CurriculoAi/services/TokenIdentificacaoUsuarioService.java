package br.com.CurriculoAi.services;

import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TokenIdentificacaoUsuarioService {

    private final TokenIdentificacaoUsurioRepository repository;

    private static final Logger logger = LoggerFactory.getLogger(TokenIdentificacaoUsuarioService.class);

    @Transactional
    public String gerarTokenDeIdentificacao(UsuarioCad usuario){

        logger.info("Iniando processo de geração de token do usuário com id: {}", usuario.getId());

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

        logger.info("Token gerado com sucesso!");

        return token;
    }
}
