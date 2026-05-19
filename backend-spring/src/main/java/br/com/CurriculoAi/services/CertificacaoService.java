package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.CertificacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.CertificacaoUser;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.CertificacaoUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CertificacaoService {

    private final CertificacaoUserRepository certificacaoUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;

    public CertificacaoService(CertificacaoUserRepository certificacaoUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository) {
        this.certificacaoUserRepository = certificacaoUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarFormacoes(List<CertificacaoDtoRequest> certificacoes, String token){

        if (certificacoes.isEmpty()) throw new ListIsEmptyException("Lista de formações não pode ser vazia");

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        List<CertificacaoUser> certificacoesSalvas = certificacoes
                .stream()
                .map(certificacao -> {
                    CertificacaoUser certificacaoNova =  new CertificacaoUser(
                            null,
                            certificacao.nomeCertificacao(),
                            certificacao.instituicao(),
                            certificacao.dataConclusao(),
                            certificacao.certificado(),
                            false,
                            usuario
                    );

                    certificacaoNova.estaEmAndamento();
                    return certificacaoNova;
                })
                .toList();

        certificacaoUserRepository.saveAll(certificacoesSalvas);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), tokenIdentificacaoUsuario.getToken());
    }
}
