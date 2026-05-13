package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.CerebrasRequestDTO;
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

    //gera transforma o markdown em pdf
    @PostMapping("/pdf")
    public ResponseEntity<byte[]> gerarPdf(
            @RequestBody CerebrasRequestDTO request
    ) throws Exception {

        //cria o curriculo em md
        String markdown =
                cerebrasService.gerarMarkdawn(request);

        //transforma o md em pdf
        byte[] pdf =
                pdfService.generatePdfFromMarkdown(markdown);

        //retorna o pdf já convertido
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=curriculo.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}