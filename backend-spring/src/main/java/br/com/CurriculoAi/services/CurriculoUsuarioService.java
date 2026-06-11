package br.com.CurriculoAi.services;

import br.com.CurriculoAi.entities.CurriculoUsuario;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.repositories.CurriculoUsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;

@Service
public class CurriculoUsuarioService {

    private static final int LIMITE_CURRICULOS = 3;

    private final Logger logger = Logger.getLogger(CurriculoUsuarioService.class.getName());

    private final CurriculoUsuarioRepository curriculoUsuarioRepository;

    public CurriculoUsuarioService(CurriculoUsuarioRepository curriculoUsuarioRepository) {
        this.curriculoUsuarioRepository = curriculoUsuarioRepository;
    }

    public void salvar(byte[] pdf, UsuarioCad usuario) {

        List<CurriculoUsuario> curriculosExistentes = curriculoUsuarioRepository
                .findByUsuario(usuario);

        if (curriculosExistentes.size() >= LIMITE_CURRICULOS) {

            CurriculoUsuario maisAntigo = curriculosExistentes
                    .stream()
                    .min(Comparator.comparing(CurriculoUsuario::getDataGeracao))
                    .orElseThrow();

            logger.info("Limite atingido. Removendo currículo mais antigo: id=" + maisAntigo.getId());

            curriculoUsuarioRepository.delete(maisAntigo);
        }

        CurriculoUsuario novo = CurriculoUsuario.builder()
                .curriculo(pdf)
                .dataGeracao(LocalDateTime.now())
                .usuario(usuario)
                .build();

        curriculoUsuarioRepository.save(novo);

        logger.info("Currículo salvo com sucesso para o usuário: " + usuario.getId());
    }
}