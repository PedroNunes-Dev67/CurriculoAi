package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.CertificacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.CertificacaoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certificacao")
public class CertificacaoController {

    private final CertificacaoService certificacaoService;
    private final static Logger logger = LoggerFactory.getLogger(CertificacaoController.class);

    public CertificacaoController(CertificacaoService certificacaoService) {
        this.certificacaoService = certificacaoService;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioTokenIdentResponseDto> registerCertificacoes(@RequestBody List<CertificacaoDtoRequest> certificacoes, @RequestParam String token){

        logger.info("Iniciando o processo de registro das certificações");

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = certificacaoService.cadastrarFormacoes(certificacoes,token);

        logger.info("Certificações cadastradas com sucesso");

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
