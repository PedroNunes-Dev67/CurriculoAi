package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.FormacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.FormacaoDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.FormacaoUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.FormacaoUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FormacaoService {

    private final FormacaoUserRepository formacaoUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;

    public FormacaoService(FormacaoUserRepository formacaoUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository) {
        this.formacaoUserRepository = formacaoUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
    }

    //Passo a lista contida no DTO da Area es o dados do método que está chamando
    @Transactional
    public UsuarioTokenIdentResponseDto addFormacaoUser(List<FormacaoDtoRequest> formacoes, String tokenIdentificacao){

        if (formacoes.isEmpty()) throw new ListIsEmptyException("Lista de forações está vazia");

        TokenIdentificacaoUsuario token = tokenIdentificacaoUsurioRepository.findByToken(tokenIdentificacao)
                .orElseThrow(() -> new ResourceNotFoundException("Token de identificação não encontrado"));

        //Pega o usuário contido no token
        UsuarioCad usuario = token.getUsuarioCad();

        List<FormacaoDtoResponse> formacoesSalvas = formacoes
                .stream()
                .map(formacao -> {

                    FormacaoUser novaFormacao = new FormacaoUser(
                            null,
                            formacao.area(),
                            formacao.tipoFormacao(),
                            formacao.dataInicio(),
                            formacao.dataConclusao(),
                            formacao.emAndamento(),
                            usuario
                    );

                    formacaoUserRepository.save(novaFormacao);

                    return new FormacaoDtoResponse(
                            novaFormacao.getId(),
                            novaFormacao.getArea(),
                            novaFormacao.getTipoFormacao(),
                            novaFormacao.getDataInicio(),
                            novaFormacao.getDataConclusao(),
                            novaFormacao.getEmAndamento(),
                            new UsuarioDtoResponse(usuario.getId(), usuario.getNome(), usuario.getEmail())
                    );
                })
                .toList();

        return new UsuarioTokenIdentResponseDto(token.getId(), usuario.getNome(), token.getToken());
    }
}
