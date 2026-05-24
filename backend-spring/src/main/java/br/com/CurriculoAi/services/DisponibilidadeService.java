package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.DisponibilidadeDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.DisponibilidadeUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.enums.ModeloDetrabalho;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.DisponibilidadeUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DisponibilidadeService {

    private final DisponibilidadeUserRepository disponibilidadeUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;

    public DisponibilidadeService(DisponibilidadeUserRepository disponibilidadeUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository) {
        this.disponibilidadeUserRepository = disponibilidadeUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarDisponibilidade(DisponibilidadeDtoRequest disponibilidadeDtoRequest, String token){

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        DisponibilidadeUser novaDisponibilidade = new DisponibilidadeUser(
                null,
                disponibilidadeDtoRequest.disponibilidadeInicio(),
                ModeloDetrabalho.from(disponibilidadeDtoRequest.modeloTrabalho()),
                usuario);

        DisponibilidadeUser disponibilidadeUserSalva = disponibilidadeUserRepository.save(novaDisponibilidade);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), tokenIdentificacaoUsuario.getToken());
    }
}
