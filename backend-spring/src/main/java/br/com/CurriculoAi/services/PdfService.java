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
                                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                                padding: 36px 44px;
                                color: #1a1a1a;
                                line-height: 1.5;
                                font-size: 13px;
                            }
                
                            h1 {
                                font-size: 24px;
                                font-weight: 700;
                                color: #1a1a2e;
                                margin: 0 0 6px 0;
                                letter-spacing: 0.5px;
                                border-bottom: 2px solid #1a1a2e;
                                padding-bottom: 8px;
                            }
                
                            h2 {
                                font-size: 9px;
                                font-weight: 700;
                                color: #ffffff;
                                background-color: #1a1a2e;
                                text-transform: uppercase;
                                letter-spacing: 0.8px;
                                padding: 4px 10px;
                                margin: 14px 0 7px 0;
                            }
                
                            h3 {
                                font-size: 11px;
                                font-weight: 700;
                                color: #1a4f8a;
                                margin: 6px 0 1px 0;
                                letter-spacing: 0.5px;
                            }
                
                            p {
                                font-size: 12px;
                                color: #333333;
                                margin: 0 0 2px 0;
                                line-height: 1.5;
                            }
                
                            ul {
                                padding-left: 14px;
                                margin: 2px 0 6px 0;
                            }
                
                            li {
                                font-size: 12px;
                                color: #333333;
                                margin-bottom: 2px;
                                line-height: 1.5;
                            }
                
                            strong {
                                color: #1a1a2e;
                                font-weight: 700;
                            }
                
                            em {
                                display: block;
                                color: #555555;
                                font-style: italic;
                                font-size: 11px;
                                margin: 1px 0 4px 0;
                            }
                
                            hr {
                                border: none;
                                border-top: 0.5px solid #e0e0e0;
                                margin: 10px 0;
                            }
                
                            a {
                                color: #1a4f8a;
                                text-decoration: none;
                            }
                
                            br {
                                display: block;
                                margin-bottom: 5px;
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
