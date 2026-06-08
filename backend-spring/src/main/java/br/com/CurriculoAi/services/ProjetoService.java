package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.request.ProjetoDtoRequest;
import br.com.CurriculoAi.DTO.response.ProjetoDtoResponse;
import br.com.CurriculoAi.entities.Projeto;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.repositories.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjetoService {

    private final ProjetoRepository projetoRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProjetoService.class);

    @Transactional
    public List<ProjetoDtoResponse> registerProjects(List<ProjetoDtoRequest> projetosParaCadastro){

        if (projetosParaCadastro.isEmpty()) throw new IllegalArgumentException("Lista de projetos está vaiza");

        logger.info("Inicinado cadastro de projetos do usuário");

        UsuarioCad usuarioCad = (UsuarioCad) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Projeto> projetosParaSalvamento = projetosParaCadastro
                .stream()
                .map(projeto -> {
                    return new Projeto(null, projeto.titulo(),projeto.descriacao(),projeto.link(), usuarioCad);
                })
                .toList();

        logger.warn("Salvando no banco de dados um total de: {}", projetosParaSalvamento.size());

        projetoRepository.saveAll(projetosParaSalvamento);

        logger.info("Cadastro de novos projetos realizado com sucesso");

        return projetosParaSalvamento
                .stream()
                .map(projeto -> {
                    return new ProjetoDtoResponse(projeto.getId(), projeto.getTitulo(), projeto.getDescricao(), projeto.getLink());
                })
                .toList();
    }
}
