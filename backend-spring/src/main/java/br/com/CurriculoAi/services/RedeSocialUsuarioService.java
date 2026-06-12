package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.RedeSocialUsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.RedeSocialDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioRedeSocialDtoResponse;
import br.com.CurriculoAi.entities.RedeSocial;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.entities.UsuarioRedeSocial;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.mapper.RedeSocialMapper;
import br.com.CurriculoAi.mapper.UsuarioMapper;
import br.com.CurriculoAi.repositories.RedeSocialRepository;
import br.com.CurriculoAi.repositories.UsuarioRedeSocialRepository;
import br.com.CurriculoAi.utils.services.UsuarioUtils;
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
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedeSocialUsuarioService {

    private final RedeSocialRepository redeSocialRepository;
    private final UsuarioUtils usuarioUtils;
    private final UsuarioRedeSocialRepository usuarioRedeSocialRepository;
    private final RedeSocialMapper redeSocialMapper;
    private final UsuarioMapper usuarioMapper;

    private static final Logger logger = LoggerFactory.getLogger(RedeSocialUsuarioService.class);

    @Transactional
    public List<UsuarioRedeSocialDtoResponse> registerRedeSocialUsuario(List<RedeSocialUsuarioDtoRequest> redesSociais){

        logger.info("Iniciando processo de registro de idiomas ao usuário");

        UsuarioCad usuarioAutenticado = usuarioUtils.me();

        List<Long> idsRedeSociais = redesSociais
                .stream()
                .map(RedeSocialUsuarioDtoRequest::id_rede_social)
                .distinct()
                .toList();

        Map<Long, RedeSocial> redesSociaisBuscadas = redeSocialRepository.findAllById(idsRedeSociais)
                .stream()
                .collect(Collectors.toMap(RedeSocial::getId, Function.identity()));


        List<UsuarioRedeSocial> redesSociaisUsuarioParaSalvar = redesSociais
                .stream()
                .map(redeSocial -> {

                    RedeSocial redeSocialBuscada = Optional.ofNullable(redesSociaisBuscadas.get(redeSocial.id_rede_social()))
                            .orElseThrow(() -> new ResourceNotFoundException("Rede social com ID: "+redeSocial.id_rede_social()));

                    return new UsuarioRedeSocial(null, redeSocial.link(), usuarioAutenticado, redeSocialBuscada);
                })
                .toList();

        logger.info("Registro de redes sociais feito com sucesso, com uma quantidade de: {}", redesSociaisUsuarioParaSalvar.size());

        return usuarioRedeSocialRepository.saveAll(redesSociaisUsuarioParaSalvar)
                .stream()
                .map(usuarioRedeSocial -> {
                    return new UsuarioRedeSocialDtoResponse(
                            usuarioRedeSocial.getId(),
                            usuarioRedeSocial.getLink(),
                            redeSocialMapper.toDto(usuarioRedeSocial.getRedeSocial())
                    );
                })
                .toList();
    }
}
