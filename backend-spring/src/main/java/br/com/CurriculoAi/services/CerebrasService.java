package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.CerebrasRequestDTO;
import br.com.CurriculoAi.DTO.response.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class CerebrasService {

    private final Logger logger = Logger.getLogger(CerebrasService.class.getName());

    @Value("${cerebras.api.key}")
    private String apiKey;

    @Value("${cerebras.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MM/yyyy");

    public String gerarMarkdawn(UsuarioFullContentDtoResponse curriculo) throws Exception {

        if (curriculo == null) {
            throw new IllegalArgumentException("Curriculo não pode ser nulo");
        }

        if (curriculo.usuario() == null) {
            throw new IllegalArgumentException("Dados do usuario nao encontrados. Verifique o mapper.");
        }

        logger.info("Iniciando geração de markdown");

        String prompt = montarPrompt(curriculo);

        CerebrasRequestDTO requestDTO = new CerebrasRequestDTO(prompt);

        String bodyJson = objectMapper.writeValueAsString(requestDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<String> request = new HttpEntity<>(bodyJson, headers);

        logger.info("Enviando request para Cerebras");

        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

        Map body = response.getBody();

        if (body == null || body.get("choices") == null) {
            throw new RuntimeException("Resposta inválida da API Cerebras");
        }

        List<Map> choices = (List<Map>) body.get("choices");
        Map message = (Map) choices.get(0).get("message");

        logger.info("Resposta recebida com sucesso");

        return (String) message.get("content");
    }

    private String montarPrompt(UsuarioFullContentDtoResponse curriculo) {

        String prompt = """
                You are a senior technical recruiter and ATS resume optimization expert. Your only task is to transform the candidate data below into a professional, ATS-optimized resume in Markdown.

                Output the entire resume in Brazilian Portuguese. Exception: technology names, frameworks, tools, APIs, and technical acronyms remain in English (e.g., Docker, React, REST API, Scrum).

                ---

                ## ABSOLUTE RULES

                1. Use ONLY information explicitly provided. Never invent data, metrics, companies, or technologies.
                2. Output ONLY the resume. No introductions, explanations, comments, or closing remarks.
                3. If a field has no data, omit that section entirely.
                4. The first character of your output must be `#` followed by the candidate's name. Nothing before it.
                5. Never use ellipsis (...), placeholders, or code blocks (``` or similar).

                ---

                ## OUTPUT FORMAT

                Follow this exact structure. Omit any section with no data.

                # [Full Name]

                [City, State] | [Email] | [linkedin.com/in/username](https://linkedin.com/in/username) | [github.com/username](https://github.com/username)

                ---

                ## Resumo Profissional

                [3 to 4 lines: professional identity + stack + years of experience / main specialization and differentiator / key achievements / career objective if senior]

                ## Habilidades Técnicas

                ### Languages
                Python 3.10, Java 17, JavaScript

                ### Backend
                Django, Spring Boot, Node.js

                [Use only subcategories the candidate explicitly mentioned. Never use bullet points for skills — comma-separated on the line below each subcategory label.]

                ## Experiência Profissional

                ### [Company] — [Area]
                **[Job Title]** | [MM/YYYY] – [MM/YYYY or Atual]

                - [Action verb + technology + result]
                - [Action verb + technology + result]

                ## Educação

                ### [Institution] — [Area]
                **[Degree type] em [Field]** | [MM/YYYY] – [MM/YYYY or Em andamento]

                ## Certificações

                - **[Institution name]** | [MM/YYYY]

                ## Idiomas

                - **[Language]:** [Nativo / Fluente (C1/C2) / Avançado (B2) / Intermediário (B1) / Básico (A2)]

                ---

                ## WRITING RULES

                - Start every experience bullet with a strong action verb: Designed, Implemented, Developed, Optimized, Migrated, Reduced, Led, Automated, Integrated, Architected, Delivered, Launched, Refactored, Deployed, Built, Scaled, Modernized.
                - Vary bullet structure across and within roles. Never repeat the same sentence pattern.
                - Include metrics when the candidate provides them. Never invent numbers.
                - Mention specific technologies in at least 60% of experience bullets.
                - Avoid: "responsible for", "assisted with", "helped the team", vague adjectives with no technical backing.

                ---

                ## CANDIDATE DATA

                Full Name: {name}
                Email: {email}
                Area of Expertise: {area}

                Professional Experience:
                {experience}

                Education:
                {education}

                Certifications:
                {certifications}

                Languages:
                {languages}

                Work Availability: {disponibilidade}
                """;

        return prompt
                .replace("{name}",         safe(curriculo.usuario().nome()))
                .replace("{email}",        safe(curriculo.usuario().email()))
                .replace("{area}",         formatarArea(curriculo.area()))
                .replace("{experience}",   formatarExperiencias(curriculo.experiencias()))
                .replace("{education}",    formatarFormacoes(curriculo.formacoes()))
                .replace("{certifications}", formatarCertificacoes(curriculo.certificoes()))
                .replace("{languages}",    formatarIdiomas(curriculo.idiomas()))
                .replace("{disponibilidade}", formatarDisponibilidade(curriculo.disponibilidade()));
    }

    private String safe(String value) {
        return value != null ? value : "";
    }

    private String formatarArea(AreaDTOResponse area) {
        if (area == null || area.nomeArea() == null) return "Não informado";
        return area.nomeArea();
    }

    private String formatarExperiencias(List<ExperienciaUserDtoResponse> experiencias) {
        if (experiencias == null || experiencias.isEmpty()) return "Não informado.";

        logger.info("Formatando experiências");

        StringBuilder sb = new StringBuilder();

        for (ExperienciaUserDtoResponse e : experiencias) {

            String empresa = (e.empresa() != null) ? safe(e.empresa().nome()) : "Empresa não informada";
            String area    = (e.area() != null)    ? safe(e.area().nomeArea()) : "";
            String cargo   = safe(e.cargo());
            String inicio  = (e.dataInicio() != null) ? e.dataInicio().format(FORMATTER) : "?";
            String fim     = Boolean.TRUE.equals(e.trabalhoAtual())
                    ? "Atual"
                    : (e.dataFim() != null ? e.dataFim().format(FORMATTER) : "?");
            String descricao = safe(e.descricao());

            sb.append("Company: ").append(empresa).append("\n");
            if (!area.isBlank()) sb.append("Area: ").append(area).append("\n");
            sb.append("Role: ").append(cargo).append("\n");
            sb.append("Period: ").append(inicio).append(" – ").append(fim).append("\n");
            if (!descricao.isBlank()) sb.append("Description: ").append(descricao).append("\n");
            sb.append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarFormacoes(List<FormacaoUserDtoResponse> formacoes) {
        if (formacoes == null || formacoes.isEmpty()) return "Não informado.";

        logger.info("Formatando formações");

        StringBuilder sb = new StringBuilder();

        for (FormacaoUserDtoResponse f : formacoes) {

            String tipo  = safe(f.tipoFormacao());
            String area  = (f.area() != null) ? safe(f.area().nomeArea()) : "Área não informada";
            String inicio = (f.dataInicio() != null) ? f.dataInicio().format(FORMATTER) : "?";
            String fim   = Boolean.TRUE.equals(f.emAndamento())
                    ? "Em andamento"
                    : (f.dataConclusao() != null ? f.dataConclusao().format(FORMATTER) : "?");

            sb.append("Type: ").append(tipo).append("\n");
            sb.append("Field: ").append(area).append("\n");
            sb.append("Period: ").append(inicio).append(" – ").append(fim).append("\n");
            sb.append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarCertificacoes(List<CertificacaoUserDtoResponse> certificacoes) {
        if (certificacoes == null || certificacoes.isEmpty()) return "Não informado.";

        logger.info("Formatando certificações");

        StringBuilder sb = new StringBuilder();

        for (CertificacaoUserDtoResponse c : certificacoes) {

            String instituicao = (c.instituicao() != null) ? safe(c.instituicao().nome()) : "Instituição não informada";
            String data = Boolean.TRUE.equals(c.emAndamento())
                    ? "Em andamento"
                    : (c.dataConclusao() != null ? c.dataConclusao().format(FORMATTER) : "?");

            sb.append("- ").append(instituicao).append(" | ").append(data).append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarIdiomas(List<IdiomaUserDtoResponse> idiomas) {
        if (idiomas == null || idiomas.isEmpty()) return "Não informado.";

        logger.info("Formatando idiomas");

        StringBuilder sb = new StringBuilder();

        for (IdiomaUserDtoResponse i : idiomas) {
            if (i.idioma() == null) continue;

            String nomeIdioma = (i.idioma().getIdioma() != null && i.idioma().getIdioma().getIdioma() != null)
                    ? i.idioma().getIdioma().getIdioma().toString()
                    : "Idioma não informado";

            String nivel = (i.idioma().getNivel() != null)
                    ? i.idioma().getNivel().toString()
                    : "Nível não informado";

            sb.append("- ").append(nomeIdioma).append(": ").append(nivel).append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarDisponibilidade(DisponibilidadeUserDtoResponse disponibilidade) {
        if (disponibilidade == null) return "Não informado.";

        StringBuilder sb = new StringBuilder();

        if (disponibilidade.modeloTrabalho() != null) {
            sb.append(disponibilidade.modeloTrabalho().toString());
        }

        if (disponibilidade.disponibilidadeInicio() != null) {
            sb.append(" a partir de ")
                    .append(disponibilidade.disponibilidadeInicio().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }

        return sb.toString().trim();
    }
}