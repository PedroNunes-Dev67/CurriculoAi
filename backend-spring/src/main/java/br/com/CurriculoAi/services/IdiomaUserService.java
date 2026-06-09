package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.IdiomaUserDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.entities.Idioma;
import br.com.CurriculoAi.entities.IdiomasUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.enums.NivelIdioma;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.IdiomaRepository;
import br.com.CurriculoAi.repositories.IdiomasUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IdiomaUserService {

    private final IdiomasUserRepository idiomasUserRepository;
    private final IdiomaRepository idiomaRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final UsuarioMapper usuarioMapper;

    private static final Logger logger = LoggerFactory.getLogger(IdiomaUserService.class);

    @Transactional
    public UsuarioFullContentDtoResponse registerIdiomasUser(List<IdiomaUserDtoRequest> idiomas, String token){

        logger.info("Iniando cadastro de idiomas do usuário, com um total de: {}",idiomas.size());

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuarioCad = tokenIdentificacaoUsuario.getUsuarioCad();

        List<Long> idsIdiomas = idiomas
                .stream()
                .map(IdiomaUserDtoRequest::id_idioma)
                .distinct()
                .toList();

        Map<Long, Idioma> idiomasPorId = idiomaRepository.findAllById(idsIdiomas)
                .stream()
                .collect(Collectors.toMap(Idioma::getId, Function.identity()));

        List<IdiomasUser> registerIdiomas = idiomas.stream()
                .map(idioma -> {

                    Idioma idiomaBuscado = Optional.ofNullable(idiomasPorId.get(idioma.id_idioma()))
                            .orElseThrow(() -> new ResourceNotFoundException("Idioma com id: "+ idioma.id_idioma()+" não encontrado"));

                    return new IdiomasUser(null, NivelIdioma.from(idioma.nivel()),usuarioCad,idiomaBuscado);
                }).toList();

        idiomasUserRepository.saveAll(registerIdiomas);

        logger.info("Cadastro de idiomas realizado com sucesso!");

        return usuarioMapper.toFullContentDto(usuarioCad);
    }
 }
