package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.CurriculoDTO;
import br.com.CurriculoAi.services.CerebrasService;
import br.com.CurriculoAi.services.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gerar")
public class CerebrasController {

    @Autowired
    private CerebrasService cerebrasService;

    @Autowired
    private PdfService pdfService;

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> gerarPdf(
            @RequestBody CurriculoDTO curriculo
    ) throws Exception {

        // gera markdown via IA
        String markdown = cerebrasService.gerarMarkdawn(curriculo);

        // converte markdown em PDF
        byte[] pdf = pdfService.generatePdfFromMarkdown(markdown);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=curriculo.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}