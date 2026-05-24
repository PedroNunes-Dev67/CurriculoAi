package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.ExperienciaDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.*;
import br.com.CurriculoAi.exceptions.ListIsEmptyException;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.EmpresaRepository;
import br.com.CurriculoAi.repositories.ExperienciaUserRepository;
import br.com.CurriculoAi.repositories.TokenIdentificacaoUsurioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ExperienciaService {

    private final ExperienciaUserRepository experienciaUserRepository;
    private final TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository;
    private final AreaUserRepository areaUserRepository;
    private final EmpresaRepository empresaRepository;

    public ExperienciaService(ExperienciaUserRepository experienciaUserRepository, TokenIdentificacaoUsurioRepository tokenIdentificacaoUsurioRepository, AreaUserRepository areaUserRepository, EmpresaRepository empresaRepository) {
        this.experienciaUserRepository = experienciaUserRepository;
        this.tokenIdentificacaoUsurioRepository = tokenIdentificacaoUsurioRepository;
        this.areaUserRepository = areaUserRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public UsuarioTokenIdentResponseDto cadastrarExperiencias(List<ExperienciaDtoRequest> experiencias, String token){

        TokenIdentificacaoUsuario tokenIdentificacaoUsuario = tokenIdentificacaoUsurioRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token não encotrado"));

        UsuarioCad usuario = tokenIdentificacaoUsuario.getUsuarioCad();

        List<Long> idsAreas = experiencias
                .stream()
                .map(ExperienciaDtoRequest::id_area)
                .distinct()
                .toList();

        List<Long> idsEmpresas = experiencias
                .stream()
                .map(ExperienciaDtoRequest::id_empresa)
                .distinct()
                .toList();

        Map<Long, Area> areasPorId = areaUserRepository.findAllById(idsAreas)
                .stream()
                .collect(Collectors.toMap(Area::getId, Function.identity()));

        Map<Long, Empresa> empresasPorId = empresaRepository.findAllById(idsEmpresas)
                .stream()
                .collect(Collectors.toMap(Empresa::getId, Function.identity()));

        List<ExperienciaUser> experienciasSalvas = experiencias
                .stream()
                .map(experiencia -> {

                    Area area = Optional.ofNullable(areasPorId.get(experiencia.id_area()))
                            .orElseThrow(() -> new ResourceNotFoundException("Área com id"+experiencia.id_area()+" não encontrada"));

                    Empresa empresa = Optional.ofNullable(empresasPorId.get(experiencia.id_empresa()))
                            .orElseThrow(() -> new ResourceNotFoundException("Empresa com id"+experiencia.id_empresa()+" não encontrada"));

                    return new ExperienciaUser(
                            null,
                            area,
                            empresa,
                            experiencia.dataInicio(),
                            experiencia.cargo(),
                            experiencia.dataFim(),
                            experiencia.descriacao(),
                            experiencia.trabalhoAtual(),
                            usuario
                    );
                })
                .toList();

        experienciaUserRepository.saveAll(experienciasSalvas);

        return new UsuarioTokenIdentResponseDto(tokenIdentificacaoUsuario.getId(), usuario.getNome(), token);
    }
}
