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
                
                                                                                           The entire output MUST be written in professional Portuguese - Brazil.
                                                                                           Exceptions: technology names, frameworks, tools, APIs, technical acronyms, and terms with no widely accepted Portuguese equivalent may remain as-is (e.g., Docker, React, CI/CD, REST API, Scrum).
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
                
                                                                                           - NEVER use ellipsis (...) anywhere in the resume
                                                                                           - NEVER describe, narrate, or explain what you are about to do
                                                                                           - NEVER introduce yourself, your role, or your process
                                                                                           - NEVER output the candidate data block as part of the resume
                                                                                           - If a field has no data, omit it entirely — never use placeholders, ellipsis, or empty markers
                                                                                           - Return ONLY the final resume in clean Markdown
                                                                                           - Do NOT include explanations, comments, notes, warnings, or observations
                                                                                           - Do NOT wrap the resume in a code block (``` or similar)
                                                                                           - Do NOT invent, fabricate, or assume information not provided
                                                                                           - Do NOT create fictional metrics, companies, dates, technologies, certifications, or achievements
                                                                                           - Do NOT ask the candidate any questions
                                                                                           - If a section lacks sufficient data, OMIT it entirely
                                                                                           - Preserve factual accuracy while improving wording, clarity, and professionalism
                                                                                           - Rewrite weak descriptions into impact-oriented, results-driven bullet points
                                                                                           - Remove redundant, repetitive, generic, or irrelevant content
                                                                                           - Never repeat the same bullet structure across different roles
                                                                                           - Keep the resume realistic, credible, and verifiable
                                                                                           - Do not include a photo, date of birth, marital status, national ID, or any unnecessary personal information
                
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
                                                                                           - Keywords MUST appear naturally and contextually
                                                                                           - NEVER keyword-stuff
                                                                                           - Prioritize contextual relevance over keyword density
                                                                                           - Include specific technology versions when available (e.g., Angular 14+, Node.js 18, .NET 6)
                
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                                           WRITING STYLE
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                                           The resume must sound:
                                                                                           - Modern and technically credible
                                                                                           - Confident without being arrogant
                                                                                           - Concise without sacrificing technical depth
                                                                                           - Achievement- and results-oriented
                
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
                                                                                           - Display only the short form: linkedin.com/in/username and github.com/username
                                                                                           - NEVER display the full https:// URL as visible text
                                                                                           - Location: City + State (never full address)
                                                                                           - If LinkedIn or GitHub are not provided, OMIT them entirely — never generate fictional placeholders
                
                                                                                           ---
                
                                                                                           ## Resumo Profissional
                
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
                
                                                                                           ## Habilidades Técnicas
                
                                                                                           SKILLS RULES:
                                                                                           - ONLY include a subcategory if the candidate explicitly mentioned at least one technology for it
                                                                                           - If no technology was provided for a subcategory, omit it entirely — never generate or assume technologies
                                                                                           - NEVER use bullet points, dashes, or any list format for skills
                                                                                           - NEVER put multiple subcategories on the same line
                                                                                           - NEVER repeat the same technology in multiple subcategories
                                                                                           - Use ### for each skill subcategory label
                                                                                           - Each subcategory must follow this exact format — label on one line, items comma-separated on the next:
                
                                                                                           ### Languages
                                                                                           Python 3.10, Java 17, JavaScript
                
                                                                                           ### Backend
                                                                                           Django, Spring Boot, Node.js
                
                                                                                           ### Cloud & DevOps
                                                                                           AWS, Docker, Kubernetes
                
                                                                                           - Include specific versions when known (Angular 14+, Python 3.10, .NET 6)
                                                                                           - Do not include technologies not mentioned by the candidate
                                                                                           - Maximum 8 to 10 items per subcategory for readability
                
                                                                                           Recommended subcategories (use only those with explicit candidate data):
                                                                                           - Languages
                                                                                           - Backend
                                                                                           - Frontend
                                                                                           - Databases
                                                                                           - Cloud & DevOps
                                                                                           - Testing
                                                                                           - Tools & Platforms
                                                                                           - Architecture & Patterns
                
                                                                                           ---
                
                                                                                           ## Projetos
                
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
                
                                                                                           ## Experiência Profissional
                
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
                
                                                                                           ## Educação
                
                                                                                           ### [Institution] — [City, State/Country]
                                                                                           **[Degree] in [Field of Study]** | [Start Year] – [Graduation Year or "Em andamento"]
                
                                                                                           EDUCATION RULES:
                                                                                           - Include GPA only if provided and above 3.5/4.0 or a notable equivalent
                                                                                           - Include status ("Em andamento") when not evident from the date range
                                                                                           - Include relevant coursework only if explicitly mentioned by the candidate
                
                                                                                           ---
                
                                                                                           ## Certificações
                
                                                                                           - **[Certification Name]** — [Issuing Organization] | [Month/Year]
                
                                                                                           CERTIFICATIONS RULES:
                                                                                           - Reverse chronological order
                                                                                           - Include issuance date when available
                                                                                           - Do not invent or assume certifications
                
                                                                                           ---
                
                                                                                           ## Idiomas
                
                                                                                           - **[Language]:** [Proficiency level]
                
                                                                                           Accepted proficiency levels:
                                                                                           - Nativo
                                                                                           - Fluente (C1/C2)
                                                                                           - Avançado (B2)
                                                                                           - Intermediário (B1)
                                                                                           - Básico (A2)
                
                                                                                           LANGUAGES RULE:
                                                                                           - Include only if the candidate provides both the language and proficiency level
                                                                                           - Do not assume proficiency that was not stated
                
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                                           MARKDOWN FORMATTING RULES
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                                           - `#` — Candidate name (single H1)
                                                                                           - `##` — Main section titles only
                                                                                           - `###` — Company name, project name, or skill subcategory label
                                                                                           - `**bold**` — job title, key achievements
                                                                                           - `-` — responsibility and achievement bullets only; NEVER for skills
                                                                                           - Spacing: one blank line between sections; no blank lines between bullets within the same role
                                                                                           - Horizontal separator `---` between the header and the first section
                                                                                           - Never use HTML tables
                                                                                           - Never use inline HTML
                                                                                           - Never use emojis
                
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                                           INTERNAL EXECUTION PROCESS
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                                           Execute internally and silently, without displaying anything to the user except the final resume:
                
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
                                                                                           14. Output only the resume — nothing before, nothing after
                
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
                
                                                                                           RETURN ONLY THE RESUME. NOTHING ELSE.
                
                                                                                           - The very first character of your output must be # followed immediately by the candidate's name
                                                                                           - The very last character of your output must be the last word of the resume
                                                                                           - Do NOT describe your process
                                                                                           - Do NOT introduce yourself or your role
                                                                                           - Do NOT explain the rules you are following
                                                                                           - No introductory sentences before the resume
                                                                                           - No concluding remarks after the resume
                                                                                           - No explanations or comments anywhere
                                                                                           - No code blocks
                                                                                           - Any text outside the resume structure is a critical violation
                
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                                                           TERMINATION RULE
                                                                                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                                                                                           The resume ends at the last data field present in the candidate's information.
                                                                                           After the last field, output NOTHING.
                                                                                           Prohibited closing phrases (any variation is also prohibited):
                                                                                           "agora é seu", "Finalizada", "Concluído", "Pronto", "done", "here you go",
                                                                                           "Vamos fazer isso", "Aqui está", "Com base nas informações", "Espero que",
                                                                                           "Posso gerar", "Abaixo está", or any sign-off, greeting, or commentary of any kind.
                                                                                           Silence after the last line is mandatory.
                                                                                           Prohibited output outside the resume structure:
                                                                                           - Any sentence that describes the candidate's readiness, motivation, or attitude
                                                                                           - Any sentence that summarizes what was done ("aqui está", "com base em", "abaixo você encontra")
                                                                                           - Any sentence written in first person from the model's perspective
                                                                                           - Any congratulatory, encouraging, or sign-off phrase
                                                                                           - Specific examples (also prohibited): "agora é seu", "Finalizada", "Concluído",
                                                                                             "Pronto", "done", "here you go", "Vamos fazer isso", "Espero que", "Posso gerar",
                                                                                             "Com base nas informações", "estou preparado para aceitar um novo desafio"
                                                                                             - Any sentence that explains the resume is complete or that there is nothing more to add
                                                                                             - Any sentence that references the format, the template, or the structure itself
                                                                                             - Specific example (also prohibited): "Não existe mais informações para serem incluídas",
                                                                                             "não há nada mais aqui", "logo, não há nada mais"
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