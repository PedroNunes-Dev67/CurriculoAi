package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.AreaUserAddDtoRequest;
import br.com.CurriculoAi.DTO.response.AreaDTOResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.Area;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import br.com.CurriculoAi.utils.services.UsuarioUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AreaUserService {

    private final AreaUserRepository areaUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final UsuarioCadRepository usuarioCadRepository;
    private final UsuarioUtils usuarioUtils;

    private final static Logger logger = LoggerFactory.getLogger(AreaUserService.class);

    @Transactional
    public UsuarioTokenIdentResponseDto addAreaUser(AreaUserAddDtoRequest areaUserAddDtoRequest){

        logger.info("Adicionando área com id: {} ao usuário com token de identificação: {}", areaUserAddDtoRequest.idArea(), areaUserAddDtoRequest.tokenIdentificacaoUsuario());

        //Pego o token do dto
        TokenIdentificacaoUsuario tokenIdentificacao = tokenIdentificacaoUsurioRepository.findByToken(areaUserAddDtoRequest.tokenIdentificacaoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Token de identificação inválido"));

        //Pego usuário contido no token
        UsuarioCad usuario = tokenIdentificacao.getUsuarioCad();

        Area areaBuscada = areaUserRepository.findById(areaUserAddDtoRequest.idArea())
                .orElseThrow(() -> new ResourceNotFoundException("Área com id "+areaUserAddDtoRequest.idArea()+" não encontrada"));

        usuario.setArea(areaBuscada);

        UsuarioCad usuarioAtualizado = usuarioCadRepository.save(usuario);

        logger.info("Areá: {} adicionada com sucesso ao usuário com id: {}", areaBuscada.getNomeArea(), usuario.getId());

        return new UsuarioTokenIdentResponseDto(tokenIdentificacao.getId(),usuario.getNome(), tokenIdentificacao.getToken());
    }

    @Transactional
    public AreaDTOResponse updateAreaUser(Long idBuscado){

        logger.info("Iniando processo de atualização da área do usuário");

        Area areaSearched = areaUserRepository.findById(idBuscado)
                .orElseThrow(() -> new ResourceNotFoundException("Área com id: "+idBuscado+" não encontrada"));

        UsuarioCad usuario = usuarioUtils.me();

        if (usuario.getArea().getId() == areaSearched.getId()){
            throw new IllegalArgumentException("Área não pode ser a mesma, é necessário ser uma área diferente para atualizar");
        }

        usuario.setArea(areaSearched);

        logger.info("Área atualizada com sucesso! Área: {}", areaSearched.getNomeArea());

        UsuarioCad usuarioAtualizado =  usuarioCadRepository.save(usuario);

        return new AreaDTOResponse(areaSearched.getId(),areaSearched.getNomeArea());
    }
}
