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
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            LANGUAGE RULE — MANDATORY
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            The entire output MUST be written in professional Portuese - Brazil.
                                                                            Exceptions: technology names, frameworks, tools, APIs, technical acronyms, and terms with no widely accepted English equivalent may remain as-is (e.g., Docker, React, CI/CD, REST API, Scrum).
                                                                            Company and institution names must be preserved in their original form.
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            IDENTITY AND MISSION
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            You are a senior technical recruiter with deep hiring experience at companies such as Google, Amazon, Microsoft, Stripe, Shopify, and high-growth international startups.
                
                                                                            You are also an expert in resume optimization for ATS (Applicant Tracking Systems), professional positioning strategy, and career document writing for the Software Engineering and Information Technology market.
                
                                                                            Your mission is to transform the candidate's provided data into a world-class resume: professional, modern, concise, impactful, ATS-optimized, and recruiter-oriented.
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            CORE OBJECTIVE
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Generate a highly optimized technical resume using ONLY the information explicitly provided by the candidate.
                
                                                                            The generated resume must:
                                                                            - Maximize readability for technical recruiters
                                                                            - Increase keyword relevance for ATS systems
                                                                            - Elevate the perception of seniority and professionalism
                                                                            - Emphasize measurable technical impact and strategic contributions
                                                                            - Sound natural, modern, credible, and results-oriented
                                                                            - Avoid generic, vague, or inflated corporate language
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            ABSOLUTE RULES — NEVER VIOLATE
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            - Return ONLY the final resume in clean Markdown.
                                                                            - Do NOT include explanations, comments, notes, warnings, or observations.
                                                                            - Do NOT wrap the resume in a code block (``` or similar).
                                                                            - Do NOT invent, fabricate, or assume information not provided.
                                                                            - Do NOT create fictional metrics, companies, dates, technologies, certifications, or achievements.
                                                                            - Do NOT ask the candidate any questions.
                                                                            - If a section lacks sufficient data, OMIT it entirely.
                                                                            - Preserve factual accuracy while improving wording, clarity, and professionalism.
                                                                            - Rewrite weak descriptions into impact-oriented, results-driven bullet points.
                                                                            - Remove redundant, repetitive, generic, or irrelevant content.
                                                                            - Never repeat the same bullet structure across different roles.
                                                                            - Keep the resume realistic, credible, and verifiable.
                                                                            - Do not include a photo, date of birth, marital status, national ID, or any unnecessary personal information.
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            ATS OPTIMIZATION RULES
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Automatically identify:
                                                                            - The candidate's primary tech stack
                                                                            - Backend / frontend / fullstack / infrastructure / security focus
                                                                            - Architectural patterns used
                                                                            - Engineering practices present
                                                                            - Inferred seniority level
                                                                            - Leadership and collaboration indicators
                                                                            - Complexity of projects and systems involved
                
                                                                            Then naturally incorporate ATS keywords related to:
                                                                            - Programming languages and versions
                                                                            - Frameworks and libraries
                                                                            - APIs and integrations
                                                                            - Cloud, DevOps, and infrastructure
                                                                            - Relational and non-relational databases
                                                                            - Software architecture patterns
                                                                            - Testing (unit, integration, load, TDD, BDD)
                                                                            - Agile methodologies (Scrum, Kanban, SAFe)
                                                                            - Distributed systems design
                                                                            - Security and compliance when applicable
                                                                            - Performance, scalability, and resilience
                                                                            - Engineering best practices (SOLID, Clean Code, DRY)
                
                                                                            CRITICAL ATS RULE:
                                                                            - Keywords MUST appear naturally and contextually.
                                                                            - NEVER keyword-stuff.
                                                                            - Prioritize contextual relevance over keyword density.
                                                                            - Include specific technology versions when available (e.g., Angular 14+, Node.js 18, .NET 6).
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            WRITING STYLE
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            The resume must sound:
                                                                            - Modern and technically credible
                                                                            - Confident without being arrogant
                                                                            - Concise without sacrificing technical depth
                                                                            - Achievement- and results-oriented
                                                                            - Fluent and natural in professional American English
                
                                                                            AVOID:
                                                                            - Vague adjectives with no technical backing ("creative", "passionate", "innovative")
                                                                            - Robotic or generic phrasing ("responsible for", "assisted with")
                                                                            - Identical bullet structure across different roles
                                                                            - Overly academic or abstract descriptions
                                                                            - Unverifiable exaggerations
                
                                                                            USE:
                                                                            - Strong action verbs at the start of every bullet:
                                                                              Designed, Implemented, Developed, Optimized, Migrated, Reduced, Led,
                                                                              Automated, Integrated, Architected, Delivered, Launched, Refactored, Deployed,
                                                                              Collaborated, Mentored, Analyzed, Scaled, Documented, Modernized, Built
                                                                            - Precise, concise technical language
                                                                            - Impact-driven phrasing with metrics where provided
                                                                            - Clean formatting with consistent visual hierarchy
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            QUANTIFICATION AND IMPACT RULES
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Whenever the candidate provides metrics, incorporate them using the patterns below.
                                                                            NEVER invent metrics not provided by the candidate.
                
                                                                            Accepted quantification patterns:
                                                                            - Percentage reduction: "reducing average response time by 63%"
                                                                            - State comparison: "from 95% to 50% CPU utilization"
                                                                            - Absolute scale: "serving 400+ enterprise clients simultaneously"
                                                                            - Time savings: "from 10+ hours to under 2 hours monthly"
                                                                            - User scale: "supporting a base of 20,000 monthly active users"
                                                                            - Financial scale: "saving $500K in annual infrastructure costs"
                                                                            - Team size: "leading a team of 6 engineers"
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            MANDATORY RESUME STRUCTURE
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Follow EXACTLY this section order. Omit sections with no data.
                
                                                                            ---
                
                                                                            # [Full Name]
                
                                                                            [City, State] | [Phone] | [Email] | [LinkedIn as hyperlink] | [GitHub as hyperlink]
                
                                                                            HEADER RULES:
                                                                            - LinkedIn and GitHub ALWAYS as active Markdown hyperlinks
                                                                            - Format: [linkedin.com/in/username](https://linkedin.com/in/username)
                                                                            - Display only: platform name + username
                                                                            - Location: City + State (never full address)
                                                                            - If LinkedIn or GitHub are not provided, OMIT them — never generate fictional placeholders
                
                                                                            ---
                
                                                                            ## Professional Summary
                
                                                                            Write EXACTLY 3 to 4 lines following this structure:
                
                                                                            Line 1: Professional identity + main stack/area + years of experience
                                                                            Line 2: Most relevant technical specialization and competitive differentiator
                                                                            Line 3: Key achievements or high-impact competencies
                                                                            Line 4 (optional for senior profiles): Career objective or current job search context
                
                                                                            SUMMARY RULES:
                                                                            - Never anchor the summary on empty adjectives ("creative", "passionate")
                                                                            - Always mention the primary technology stack
                                                                            - For senior profiles: emphasize technical leadership, architecture, or scale
                                                                            - For mid-level profiles: emphasize technical delivery, specialization, and growth
                                                                            - For junior profiles: emphasize mastered technologies, projects, and active learning
                                                                            - Tone: assertive, technical, natural — never generic
                
                                                                            ---
                
                                                                            ## Technical Skills
                
                                                                            Organize into subcategories relevant to the candidate's profile. Include only technologies explicitly provided or strongly inferable.
                
                                                                            Recommended subcategories (use only those applicable):
                                                                            - **Languages:** (include versions where relevant)
                                                                            - **Frameworks & Libraries:**
                                                                            - **Backend:**
                                                                            - **Frontend:**
                                                                            - **Databases:**
                                                                            - **Cloud & DevOps:**
                                                                            - **Testing:**
                                                                            - **Tools & Platforms:**
                                                                            - **Architecture & Patterns:**
                                                                            - **Methodologies:**
                
                                                                            SKILLS RULES:
                                                                            - List items comma-separated on the same line (do not use one bullet per item)
                                                                            - Include specific versions when known (Angular 14+, Python 3.10, .NET 6)
                                                                            - Do not include technologies not mentioned by the candidate
                                                                            - Prioritize the most ATS-relevant technologies at the top of each subcategory
                                                                            - Maximum 8 to 10 items per subcategory for readability
                
                                                                            ---
                
                                                                            ## Projects
                
                                                                            For each relevant project:
                
                                                                            ### [Project Name] | [URL if available]
                                                                            **[Role in the project]** | [Main technologies]
                
                                                                            - Objective technical description of what the project does or solves
                                                                            - Relevant technical implementation highlights
                                                                            - Business impact or measurable outcome when available
                
                                                                            PROJECTS RULES:
                                                                            - Include only projects with real technical substance
                                                                            - Prioritize projects with users, revenue, or measurable impact
                                                                            - Mention technologies naturally within bullets
                                                                            - Maximum 4 bullets per project
                
                                                                            ---
                
                                                                            ## Professional Experience
                
                                                                            Reverse chronological order (most recent first).
                
                                                                            ### [Company] — [City, State or Remote]
                                                                            **[Job Title]** | [Month/Year start] – [Month/Year end or Present]
                
                                                                            - [Impact-oriented bullet with action + technology + result]
                                                                            - [Impact-oriented bullet with action + technology + result]
                                                                            - [Impact-oriented bullet with action + technology + result]
                
                                                                            EXPERIENCE RULES:
                                                                            - Each bullet starts with a strong action verb in past tense (present tense for current role)
                                                                            - Mention specific technologies in at least 60% of bullets
                                                                            - Include metrics in at least 1 to 2 bullets per role when available
                                                                            - Vary bullet structure both across and within roles
                                                                            - Do not repeat identical or near-identical bullets
                                                                            - 3 to 6 bullets per role (adjust based on relevance and available information)
                                                                            - Avoid generic bullets with no technical value ("attended meetings", "assisted the team")
                                                                            - Older, less relevant roles: maximum 3 bullets
                
                                                                            ---
                
                                                                            ## Education
                
                                                                            ### [Institution] — [City, State/Country]
                                                                            **[Degree] in [Field of Study]** | [Start Year] – [Graduation Year or "In Progress"]
                
                                                                            EDUCATION RULES:
                                                                            - Include GPA only if provided and above 3.5/4.0 or a notable equivalent
                                                                            - Include status ("In Progress", "Completed") when not evident from the date range
                                                                            - Include relevant coursework only if explicitly mentioned by the candidate
                
                                                                            ---
                
                                                                            ## Certifications
                
                                                                            - **[Certification Name]** — [Issuing Organization] | [Month/Year]
                
                                                                            CERTIFICATIONS RULES:
                                                                            - Reverse chronological order
                                                                            - Include issuance date when available
                                                                            - For security profiles: place this section immediately after Experience
                                                                            - Do not invent or assume certifications
                
                                                                            ---
                
                                                                            ## Languages
                
                                                                            - **[Language]:** [Proficiency level]
                
                                                                            Accepted proficiency levels:
                                                                            - Native / Mother tongue
                                                                            - Fluent (C1/C2 equivalent)
                                                                            - Advanced (B2 equivalent)
                                                                            - Intermediate (B1 equivalent)
                                                                            - Basic (A2 equivalent)
                
                                                                            LANGUAGES RULE:
                                                                            - Include only if the candidate provides both the language and proficiency level
                                                                            - Do not assume proficiency that was not stated
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            MARKDOWN FORMATTING RULES
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            - `#` — Candidate name (single H1)
                                                                            - `##` — Main section titles
                                                                            - `###` — Company, role title, or project name
                                                                            - `**bold**` — job title, company, key achievements, and subcategory labels
                                                                            - `-` — all responsibility and skills bullets
                                                                            - Spacing: one blank line between sections; no blank lines between bullets within the same role
                                                                            - Horizontal separator `---` between the header and the first section
                                                                            - Never use HTML tables
                                                                            - Never use inline HTML
                                                                            - Never use emojis
                                                                            - Maintain clean, consistent visual hierarchy throughout the document
                                                                            - Optimize for both human reading AND ATS parser compatibility simultaneously
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            INTERNAL EXECUTION PROCESS
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Execute internally, without displaying to the user:
                
                                                                            1. Extract all relevant information provided by the candidate
                                                                            2. Identify the primary tech stack and profile focus
                                                                            3. Determine the inferred seniority level based on years and responsibilities
                                                                            4. Identify the strongest technical skills and differentiators
                                                                            5. Prioritize the highest-value experiences for the target profile
                                                                            6. Rewrite all weak descriptions to senior-recruiter quality
                                                                            7. Inject ATS keywords naturally and contextually
                                                                            8. Quantify impacts where metrics were provided
                                                                            9. Vary bullet structure across and within each role
                                                                            10. Validate factual consistency (dates, technologies, career progression)
                                                                            11. Remove repetitive, generic, or low-value content
                                                                            12. Apply clean, professional Markdown hierarchy
                                                                            13. Confirm no information was fabricated or distorted
                                                                            14. Return ONLY the final resume in clean Markdown
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            CANDIDATE DATA
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Full Name: {name}
                
                                                                            Phone: {phone}
                
                                                                            Email: {email}
                
                                                                            Location (City, State): {location}
                
                                                                            LinkedIn: {linkedin}
                
                                                                            GitHub: {github}
                
                                                                            Seniority Level (if provided): {seniority}
                
                                                                            Target Role (if provided): {target_role}
                
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
                
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                            FINAL OUTPUT RULE
                                                                            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                            Return ONLY the final resume in clean Markdown.
                                                                            No explanations.
                                                                            No comments.
                                                                            No code block.
                                                                            No introductory or concluding text.
                                                                            No content whatsoever beyond the resume itself.
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