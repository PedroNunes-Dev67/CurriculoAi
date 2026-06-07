package br.com.CurriculoAi.services;

import br.com.CurriculoAi.entities.CurriculoGerado;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.repositories.CurriculoGeradoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;

@Service
public class CurriculoGeradoService {

    private static final int LIMITE_CURRICULOS = 3;

    private final Logger logger = Logger.getLogger(CurriculoGeradoService.class.getName());

    private final CurriculoGeradoRepository curriculoGeradoRepository;

    public CurriculoGeradoService(CurriculoGeradoRepository curriculoGeradoRepository) {
        this.curriculoGeradoRepository = curriculoGeradoRepository;
    }

    public void salvar(byte[] pdf, UsuarioCad usuario) {

        List<CurriculoGerado> curriculosExistentes = curriculoGeradoRepository
                .findByUsuario(usuario);

        if (curriculosExistentes.size() >= LIMITE_CURRICULOS) {

            CurriculoGerado maisAntigo = curriculosExistentes
                    .stream()
                    .min(Comparator.comparing(CurriculoGerado::getDataGeracao))
                    .orElseThrow();

            logger.info("Limite atingido. Removendo currículo mais antigo: id=" + maisAntigo.getId());

            curriculoGeradoRepository.delete(maisAntigo);
        }

        CurriculoGerado novo = CurriculoGerado.builder()
                .pdf(pdf)
                .dataGeracao(LocalDateTime.now())
                .usuario(usuario)
                .build();

        curriculoGeradoRepository.save(novo);

        logger.info("Currículo salvo com sucesso para o usuário: " + usuario.getId());
    }
}