package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.FormacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.Area;
import br.com.CurriculoAi.entities.FormacaoUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.enums.TipoFormacao;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.FormacaoUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FormacaoService {

    private final FormacaoUserRepository formacaoUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final AreaUserRepository areaUserRepository;

    public FormacaoService(FormacaoUserRepository formacaoUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository, AreaUserRepository areaUserRepository) {
        this.formacaoUserRepository = formacaoUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
        this.areaUserRepository = areaUserRepository;
    }

    //Passo a lista contida no DTO da Area es o dados do método que está chamando
    @Transactional
    public UsuarioTokenIdentResponseDto addFormacaoUser(List<FormacaoDtoRequest> formacoes, String tokenIdentificacao){

        if (formacoes.isEmpty()) throw new ListIsEmptyException("Lista de forações está vazia");

        TokenIdentificacaoUsuario token = tokenIdentificacaoUsurioRepository.findByToken(tokenIdentificacao)
                .orElseThrow(() -> new ResourceNotFoundException("Token de identificação não encontrado"));

        //Pega o usuário contido no token
        UsuarioCad usuario = token.getUsuarioCad();

        // Pegas todos os ids das áreas sem repetir
        List<Long> idsAreas = formacoes
                .stream()
                .map(FormacaoDtoRequest::id_area)
                .distinct()
                .toList();

        //Busca todas as áreas no banco em mantém em 'cache'
        Map<Long, Area> areasPorId = areaUserRepository
                .findAllById(idsAreas)
                .stream()
                .collect(Collectors.toMap(Area::getId, Function.identity()));

        List<FormacaoUser> formacoesSalvas = formacoes
                .stream()
                .map(formacao -> {

                    //Busca no cache as áres do usuário, pode vir null ai por o Optional
                    Area area = Optional.ofNullable(areasPorId.get(formacao.id_area()))
                            .orElseThrow(() -> new ResourceNotFoundException("Área com id: "+formacao.id_area()+" não encontrada"));

                    return new FormacaoUser(
                            null,
                            area,
                            TipoFormacao.from(formacao.tipoFormacao()),
                            formacao.dataInicio(),
                            formacao.dataConclusao(),
                            formacao.emAndamento(),
                            usuario
                    );
                })
                .toList();

        formacaoUserRepository.saveAll(formacoesSalvas);

        return new UsuarioTokenIdentResponseDto(token.getId(), usuario.getNome(), token.getToken());
    }
}
