package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.CerebrasRequestDTO;
import br.com.CurriculoAi.DTO.CurriculoDTO;
import br.com.CurriculoAi.enums.ModeloDeTrabalho;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    public String gerarMarkdawn(CurriculoDTO curriculo) throws Exception {

        if (curriculo == null) {
            throw new IllegalArgumentException("Curriculo não pode ser nulo");
        }

        // MOCK DE DISPONIBILIDADE
        if (curriculo.getDisponibilidade() == null) {

            CurriculoDTO.DisponibilidadeDTO disponibilidade =
                    new CurriculoDTO.DisponibilidadeDTO();

            disponibilidade.setCargaHoraria(40);

            disponibilidade.setDisponibilidadeInicio(
                    java.time.LocalDate.now()
            );

            disponibilidade.setModeloTrabalho(
                    ModeloDeTrabalho.REMOTO
            );

            disponibilidade.setTipoContrato("CLT");

            curriculo.setDisponibilidade(disponibilidade);
        }

        logger.info("Iniciando geração de markdown");

        String prompt = montarPrompt(curriculo);

        CerebrasRequestDTO requestDTO =
                new CerebrasRequestDTO(prompt);

        String bodyJson =
                objectMapper.writeValueAsString(requestDTO);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<String> request =
                new HttpEntity<>(bodyJson, headers);

        logger.info("Enviando request para Cerebras");

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        apiUrl,
                        request,
                        Map.class
                );

        Map body = response.getBody();

        if (body == null || body.get("choices") == null) {
            throw new RuntimeException(
                    "Resposta inválida da API Cerebras"
            );
        }

        List<Map> choices =
                (List<Map>) body.get("choices");

        Map message =
                (Map) choices.get(0).get("message");

        logger.info("Resposta recebida com sucesso");

        return (String) message.get("content");
    }

    private String montarPrompt(CurriculoDTO curriculo) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                
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
                
                                                                                          [City, State] | [Phone] | [Email] | [linkedin.com/in/username](https://linkedin.com/in/username) | [github.com/username](https://github.com/username)
                
                                                                                          ---
                
                                                                                          ## Resumo Profissional
                
                                                                                          [3 to 4 lines: professional identity + stack + years of experience / main specialization and differentiator / key achievements / career objective if senior]
                
                                                                                          ## Habilidades Técnicas
                
                                                                                          ### Languages
                                                                                          Python 3.10, Java 17, JavaScript
                
                                                                                          ### Backend
                                                                                          Django, Spring Boot, Node.js
                
                                                                                          ### Frontend
                                                                                          React, Angular 14+
                
                                                                                          ### Databases
                                                                                          PostgreSQL, MongoDB
                
                                                                                          ### Cloud & DevOps
                                                                                          AWS, Docker, Kubernetes
                
                                                                                          ### Architecture & Patterns
                                                                                          REST API, Microservices, SOLID
                
                                                                                          [Use only subcategories the candidate explicitly mentioned. Never use bullet points for skills — comma-separated on the line below each subcategory label.]
                
                                                                                          ## Projetos
                
                                                                                          ### [Project Name] | [URL if available]
                                                                                          **[Role]** | [Technologies]
                
                                                                                          - [What the project does and why it matters]
                                                                                          - [Key technical implementation detail]
                                                                                          - [Measurable outcome or business impact if available]
                
                                                                                          ## Experiência Profissional
                
                                                                                          ### [Company] — [City, State or Remote]
                                                                                          **[Job Title]** | [MM/YYYY] – [MM/YYYY or Present]
                
                                                                                          - [Action verb + technology + result]
                                                                                          - [Action verb + technology + result]
                                                                                          - [Action verb + technology + result]
                
                                                                                          ## Educação
                
                                                                                          ### [Institution] — [City, State]
                                                                                          **[Degree] in [Field]** | [YYYY] – [YYYY or Em andamento]
                
                                                                                          ## Certificações
                
                                                                                          - **[Certification Name]** — [Organization] | [MM/YYYY]
                
                                                                                          ## Idiomas
                
                                                                                          - **[Language]:** [Nativo / Fluente (C1/C2) / Avançado (B2) / Intermediário (B1) / Básico (A2)]
                
                                                                                          ---
                
                                                                                          ## WRITING RULES
                
                                                                                          - Start every experience bullet with a strong action verb: Designed, Implemented, Developed, Optimized, Migrated, Reduced, Led, Automated, Integrated, Architected, Delivered, Launched, Refactored, Deployed, Built, Scaled, Modernized.
                                                                                          - Vary bullet structure across and within roles. Never repeat the same sentence pattern.
                                                                                          - Include metrics when the candidate provides them. Never invent numbers.
                                                                                          - Mention specific technologies in at least 60% of experience bullets.
                                                                                          - Avoid: "responsible for", "assisted with", "helped the team", vague adjectives with no technical backing.
                                                                                          - LinkedIn and GitHub as Markdown hyperlinks. Display only the short form as visible text.
                
                                                                                          ---
                
                                                                                          ## CANDIDATE DATA
                
                                                                                          Full Name: {name}
                                                                                          Phone: {phone}
                                                                                          Email: {email}
                                                                                          Location: {location}
                                                                                          LinkedIn: {linkedin}
                                                                                          GitHub: {github}
                                                                                          Seniority Level: {seniority}
                                                                                          Target Role: {target_role}
                
                                                                                          Professional Experience:
                                                                                          {experience}
                
                                                                                          Education:
                                                                                          {education}
                
                                                                                          Projects:
                                                                                          {projects}
                
                                                                                          Certifications & Courses:
                                                                                          {certifications}
                
                                                                                          Technical Skills:
                                                                                          {skills}
                
                                                                                          Languages:
                                                                                          {languages}
                
                                                                                          Additional Information:
                                                                                          {additional_info}
""");

        //falta por replace em alguns dados que não tem entidade
        return prompt.toString()
                .replace("{nome}", safe(curriculo.getNome()))
                .replace("{email}", safe(curriculo.getEmail()))
                .replace("{experiencias}", formatarExperiencias(curriculo.getExperiencias()))
                .replace("{formacoes}", formatarFormacoes(curriculo.getFormacoes()))
                .replace("{certificacoes}", formatarCertificacoes(curriculo.getCertificacoes()))
                .replace("{idiomas}", formatarIdiomas(curriculo.getIdiomas()));
    }

    private String safe(String value) {
        return value != null ? value : "";
    }


    private String formatarFormacoes(List<CurriculoDTO.FormacaoDTO> formacoes) {
        if (formacoes == null || formacoes.isEmpty()) return "Não informado.";

        logger.info("formatando as formações");

        StringBuilder sb = new StringBuilder();

        for (CurriculoDTO.FormacaoDTO f : formacoes) {
            sb.append("- ")
                    .append(f.getTipoFormacao()).append(" em ")
                    .append(f.getArea());

            if (Boolean.TRUE.equals(f.getEmAndamento())) {
                sb.append(" (Em andamento)");
            }

            sb.append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarExperiencias(List<CurriculoDTO.ExperienciaDTO> experiencias) {
        if (experiencias == null || experiencias.isEmpty()) return "Não informado.";

        logger.info("formatando as experiencias");

        StringBuilder sb = new StringBuilder();

        for (CurriculoDTO.ExperienciaDTO e : experiencias) {
            sb.append("- ")
                    .append(e.getCargo())
                    .append(" | ")
                    .append(e.getEmpresa())
                    .append(" | ")
                    .append(e.getArea())
                    .append("\n")
                    .append("  Habilidades: ")
                    .append(e.getHabilidades())
                    .append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarIdiomas(List<CurriculoDTO.IdiomaDTO> idiomas) {
        if (idiomas == null || idiomas.isEmpty()) return "Não informado.";

        logger.info("formatando os idiomas");

        StringBuilder sb = new StringBuilder();

        for (CurriculoDTO.IdiomaDTO i : idiomas) {
            sb.append("- ")
                    .append(i.getIdioma())
                    .append(": ")
                    .append(i.getNivel())
                    .append("\n");
        }

        return sb.toString().trim();
    }

    private String formatarCertificacoes(List<CurriculoDTO.CertificacaoDTO> certificacoes) {
        if (certificacoes == null || certificacoes.isEmpty()) return "Não informado.";

        logger.info("formatando as Certificacoe");

        StringBuilder sb = new StringBuilder();

        for (CurriculoDTO.CertificacaoDTO c : certificacoes) {
            sb.append("- ")
                    .append(c.getNomePlataforma())
                    .append("\n");
        }

        return sb.toString().trim();
    }

}