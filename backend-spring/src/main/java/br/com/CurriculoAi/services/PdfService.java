package br.com.CurriculoAi.services;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.logging.Logger;

@Service
public class PdfService {

    Logger logger = Logger.getLogger(PdfService.class.getName());

    public byte[] generatePdfFromMarkdown(String markdown) throws Exception {

        logger.info("Iniciando a geração do PDF");

        // Markdown -> HTML
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown);

        HtmlRenderer renderer = HtmlRenderer.builder().build();

        String htmlContent = renderer.render(document);

        // Template HTML completo
        String finalHtml = """
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 40px;
                                color: #222;
                                line-height: 1.6;
                            }

                            h1 {
                                color: #111;
                                border-bottom: 2px solid #ddd;
                                padding-bottom: 10px;
                            }

                            h2 {
                                color: #333;
                                margin-top: 30px;
                            }

                            ul {
                                padding-left: 20px;
                            }

                            strong {
                                color: #000;
                            }

                            hr {
                                margin: 20px 0;
                            }
                        </style>
                    </head>

                    <body>
                        %s
                    </body>
                </html>
                """.formatted(htmlContent);

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        PdfRendererBuilder builder =
                new PdfRendererBuilder();

        builder.withHtmlContent(finalHtml, null);

        builder.toStream(outputStream);

        builder.run();

        return outputStream.toByteArray();
    }
}
