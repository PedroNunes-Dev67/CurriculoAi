package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.IdiomaUserDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.Idioma;
import br.com.CurriculoAi.entities.IdiomasUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.enums.IdiomaEnum;
import br.com.CurriculoAi.enums.NivelIdioma;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.IdiomaRepository;
import br.com.CurriculoAi.repositories.IdiomasUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UsuarioIdiomaService {

    private final IdiomasUserRepository idiomasUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final IdiomaRepository idiomaRepository;

    public UsuarioIdiomaService(IdiomasUserRepository idiomasUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository, IdiomaRepository idiomaRepository) {
        this.idiomasUserRepository = idiomasUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
        this.idiomaRepository = idiomaRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto addIdiomas(List<IdiomaUserDtoRequest> idiomas, String token){

        if (idiomas.isEmpty()) throw new ListIsEmptyException("Lista de idiomas não pode ser vazia");

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        List<Long> idsIdiomas = idiomas
                .stream()
                .map(IdiomaUserDtoRequest::id_idioma)
                .distinct()
                .toList();

        Map<Long, Idioma> idiomasPorId = idiomaRepository.findAllById(idsIdiomas)
                .stream()
                .collect(Collectors.toMap(Idioma::getId, Function.identity()));


        List<Idioma> idiomasBuscados = idiomaRepository.findAllById(idsIdiomas);

        List<IdiomasUser> idiomasUsuario = idiomas
                .stream()
                .map(idiomaUserDtoRequest -> {
                    Idioma idioma = Optional.ofNullable(idiomasPorId.get(idiomaUserDtoRequest.id_idioma()))
                            .orElseThrow(() -> new ResourceNotFoundException("Idioma com id: " + idiomaUserDtoRequest.id_idioma() + " não encontrado"));

                    return new IdiomasUser(
                            null,
                            NivelIdioma.from(idiomaUserDtoRequest.nivel()),
                            usuario,
                            idioma
                    );
                })
                .toList();

        idiomasUserRepository.saveAll(idiomasUsuario);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), token);
    }
}
