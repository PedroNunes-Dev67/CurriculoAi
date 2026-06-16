package br.com.CurriculoAi.security;

import br.com.CurriculoAi.entities.UsuarioCad;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TokenService {

    @Value("${jwt-secret}")
    private String keySecret;

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    public String gerarToken(UsuarioCad usuarioCad){

        logger.warn("Geração de token pelo usuário com email: {}", usuarioCad.getEmail());

        Algorithm algorithm = Algorithm.HMAC256(keySecret);

        //Gera um token JWT que contem uma assinatura e um subject contendo o email do usuário
        String tokenGerado =  JWT.create()
                .withIssuer("CurriculoAi")
                .withSubject(usuarioCad.getEmail())
                .withExpiresAt(gerarTempoDeDuracaoToken())
                .sign(algorithm);

        logger.info("JWT gerado com sucesso!");

        return tokenGerado;
    }

    public String validarTokenJWT(String token){

        logger.warn("Validação de token iniciada: {}",token);

        Algorithm algorithm = Algorithm.HMAC256(keySecret);

        //Faz a validação do token e pega o email no subject
        String emailDoSubject = JWT.require(algorithm)
                .withIssuer("CurriculoAi")
                .build()
                .verify(token)
                .getSubject();

        logger.info("Validação do token concluida com sucesso!");

        return emailDoSubject;
    }

    private Instant gerarTempoDeDuracaoToken(){
        return Instant.now().plusSeconds(3600); //Duração de 1 hora
    }
}
