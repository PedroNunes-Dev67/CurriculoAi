package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.DisponibilidadeDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.DisponibilidadeUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.enums.ModeloDeTrabalho;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.DisponibilidadeUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DisponibilidadeService {

    private final DisponibilidadeUserRepository disponibilidadeUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;

    private static final Logger logger = LoggerFactory.getLogger(DisponibilidadeService.class);

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarDisponibilidade(DisponibilidadeDtoRequest disponibilidadeDtoRequest, String token){

        logger.info("Iniciando o cadastro de disponibilidade do usuário...");

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        DisponibilidadeUser novaDisponibilidade = new DisponibilidadeUser(
                null,
                disponibilidadeDtoRequest.disponibilidadeInicio(),
                ModeloDeTrabalho.from(disponibilidadeDtoRequest.modeloTrabalho()),
                usuario);

        DisponibilidadeUser disponibilidadeUserSalva = disponibilidadeUserRepository.save(novaDisponibilidade);

        logger.info("Disponibilidade salva com sucesso! Com id: {}", disponibilidadeUserSalva.getId());

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), tokenIdentificacaoUsuario.getToken());
    }
}
