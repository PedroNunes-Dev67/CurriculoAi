package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.AreaUserAddDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.Area;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AreaUserService {

    private final AreaUserRepository areaUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final UsuarioCadRepository usuarioCadRepository;

    public AreaUserService(AreaUserRepository areaUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository, UsuarioCadRepository usuarioCadRepository, FormacaoService formacaoService) {
        this.areaUserRepository = areaUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
        this.usuarioCadRepository = usuarioCadRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto addAreaUser(AreaUserAddDtoRequest areaUserAddDtoRequest){

        //Pego o token do dto
        TokenIdentificacaoUsuario tokenIdentificacao = tokenIdentificacaoUsurioRepository.findByToken(areaUserAddDtoRequest.tokenIdentificacaoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Token de identificação inválido"));

        //Pego usuário contido no token
        UsuarioCad usuario = tokenIdentificacao.getUsuarioCad();

        Area areaBuscada = areaUserRepository.findById(areaUserAddDtoRequest.idArea())
                .orElseThrow(() -> new ResourceNotFoundException("Área com id "+areaUserAddDtoRequest.idArea()+" não encontrada"));

        usuario.setArea(areaBuscada);

        //Altero a área do usuario e logo apos salvo
        UsuarioCad usuarioAtualizado = usuarioCadRepository.save(usuario);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacao.getId(),usuario.getNome(), tokenIdentificacao.getToken());
    }
}
