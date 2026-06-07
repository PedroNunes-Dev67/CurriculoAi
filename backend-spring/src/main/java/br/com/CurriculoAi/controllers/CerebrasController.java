package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.services.CerebrasService;
import br.com.CurriculoAi.services.CurriculoGeradoService;
import br.com.CurriculoAi.services.PdfService;
import br.com.CurriculoAi.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gerar")
public class CerebrasController {

    @Autowired
    private CerebrasService cerebrasService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CurriculoGeradoService curriculoGeradoService;

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> gerarPdf() throws Exception {

        UsuarioFullContentDtoResponse curriculo = usuarioService.me();

        String markdown = cerebrasService.gerarMarkdawn(curriculo);

        byte[] pdf = pdfService.generatePdfFromMarkdown(markdown);

        //salva o curriculo no usuario autenticado
        UsuarioCad usuarioAutenticado = (UsuarioCad) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        curriculoGeradoService.salvar(pdf, usuarioAutenticado);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=curriculo.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}