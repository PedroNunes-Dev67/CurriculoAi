package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.CertificacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.CertificacaoUser;
import br.com.CurriculoAi.entities.Instituicao;
import br.com.CurriculoAi.entities.TokenIdentificacaoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.CertificacaoUserRepository;
import br.com.CurriculoAi.repositories.InstituicaoRepository;
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
public class CertificacaoService {

    private final CertificacaoUserRepository certificacaoUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final InstituicaoRepository instituicaoRepository;

    private static final Logger logger = LoggerFactory.getLogger(CertificacaoService.class);

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarFormacoes(List<CertificacaoDtoRequest> certificacoes, String token){

        logger.info("Iniando o cadastro de formações do usuário, quantidade de formações: {}", certificacoes.size());

        if (certificacoes.isEmpty()) throw new ListIsEmptyException("Lista de certificações não pode ser vazia");

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encontrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        List<Long> idsInstituicoes = certificacoes
                .stream()
                .map(CertificacaoDtoRequest::id_instituicao)
                .distinct()
                .toList();

        // Armazena todas as instituições que estão vindo para cadastro em um cache local, para não ir no banco desnecessáriamente
        Map<Long, Instituicao> instituicoesPorId = instituicaoRepository.findAllById(idsInstituicoes)
                .stream()
                .collect(Collectors.toMap(Instituicao::getId, Function.identity()));

        List<CertificacaoUser> certificacoesSalvas = certificacoes
                .stream()
                .map(certificacao -> {

                    Instituicao instituicao = Optional.ofNullable(instituicoesPorId.get(certificacao.id_instituicao()))
                            .orElseThrow(() -> new ResourceNotFoundException("Instituição com id: "+certificacao.id_instituicao()+" não encontrada"));

                    boolean emAndamento = certificacao.dataConclusao() == null;

                    CertificacaoUser certificacaoNova =  new CertificacaoUser(
                            null,
                            certificacao.nomeCertificacao(),
                            instituicao,
                            certificacao.dataConclusao(),
                            certificacao.certificado(),
                            emAndamento,
                            usuario
                    );

                    certificacaoNova.estaEmAndamento();
                    return certificacaoNova;
                })
                .toList();

        certificacaoUserRepository.saveAll(certificacoesSalvas);

        logger.info("Certificações salvas com sucesso!");

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), tokenIdentificacaoUsuario.getToken());
    }
}
