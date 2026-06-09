package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.response.EmpresaDtoResponse;
import br.com.CurriculoAi.entities.Empresa;
import br.com.CurriculoAi.repositories.EmpresaRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    private static final Logger logger = LoggerFactory.getLogger(EmpresaService.class);

    public List<EmpresaDtoResponse> findAll(){

        logger.info("Buscando empresas...");

        List<Empresa> empresasBuscadas = empresaRepository.findAll();

        logger.info("Empresas buscadas, com um total de: {}", empresasBuscadas.size());

        return empresasBuscadas
                .stream()
                .map(empresa -> {
                    return new EmpresaDtoResponse(empresa.getId(),empresa.getNome());
                })
                .toList();
    }
}
