# 📄 CurriculoAI

> Plataforma inteligente para geração e análise de currículos com IA

---

## 🚀 Sobre o Projeto

O **CurriculoAI** é uma aplicação fullstack que permite ao usuário montar seu currículo profissional de forma guiada e, com um clique, gerar um currículo otimizado para ATS (Applicant Tracking Systems) usando inteligência artificial.

O sistema coleta dados completos do candidato — experiências, formações, certificações, idiomas, habilidades e disponibilidade — e usa um prompt cuidadosamente engenheirado para produzir um currículo profissional em Markdown, que depois é convertido para PDF.

---

## 🧱 Arquitetura

O projeto é dividido em dois módulos principais:

```
CurriculoAi/
├── backend-spring/        # API REST com Spring Boot (Java 21)
└── curriculo-ai-frontend/ # App mobile com React Native + Expo
```

---

## ✨ Funcionalidades

- **Cadastro e autenticação** de usuários com JWT
- **Preenchimento guiado** de dados do currículo (experiência, formação, certificações, idiomas, projetos, redes sociais)
- **Geração de currículo em Markdown** via Cerebras AI com prompt otimizado para ATS
- **Geração de PDF** a partir do conteúdo gerado
- **Análise do currículo** com feedback inteligente
- **Perfil do usuário** com área de atuação e disponibilidade de trabalho (presencial, remoto, híbrido)

---

## 🖥️ Backend — Spring Boot

### Tecnologias

| Tecnologia |
|---|
| Java | 
| Spring Boot | 
| Spring Security + JWT |
| Spring Data JPA | 
| PostgreSQL |
| Flyway | 
| MapStruct |
| OpenAPI (Swagger) |
| Docker |

### Estrutura do Backend

```
backend-spring/src/main/java/br/com/CurriculoAi/
├── controllers/    # Endpoints REST
├── services/       # Regras de negócio e integração com Cerebras
├── entities/       # Entidades JPA (Usuario, Experiencia, Formacao, etc.)
├── repositories/   # Spring Data Repositories
├── DTO/            # DTOs de request e response
├── mapper/         # MapStruct mappers
├── security/       # JWT e configuração do Spring Security
├── enums/          # Enums (ModeloDeTrabalho, NivelIdioma, TipoFormacao...)
└── exceptions/     # Tratamento global de erros
```

### Como rodar o Backend

**Pré-requisitos:** Java 21, Maven, PostgreSQL

```bash
cd backend-spring

# Configurar as variáveis de ambiente em application.properties
# ou application-prod.properties

mvn spring-boot:run
```

**Via Docker:**

```bash
cd backend-spring
docker build -t curriculo-ai-backend .
docker run -p 8080:8080 curriculo-ai-backend

#Configurar variavies para conexão com banco de dados (caso for usar PostgreSQL)
```

A API ficará disponível em `http://localhost:8080`. A documentação Swagger estará em `http://localhost:8080/swagger-ui.html`.

### Variáveis de Ambiente (Backend)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/curriculo_ai
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

cerebras.api.url=https://api.cerebras.ai/v1/chat/completions
cerebras.api.key=sua_chave_api_cerebras

jwt.secret=seu_segredo_jwt
```

### Banco de Dados

O banco é gerenciado pelo **Flyway**. As migrations estão em `src/main/resources/db/migration/`.

Principais entidades:

- `usuario` — dados do candidato
- `experiencia` — histórico profissional
- `formacao` — formação acadêmica
- `certificacao_user` — certificações
- `idiomas_user` — idiomas e nível
- `disponibilidade` — modelo e data de disponibilidade
- `curriculo_usuario` — currículo gerado em Markdown
- `avaliacao_curriculo` — análise/feedback da IA

---

## 📱 Frontend — React Native + Expo

### Tecnologias

| Tecnologia | Versão |
|---|---|
| React Native | 0.81.5 |
| Expo | ~54.0.33 |
| Expo Router | ~6.0.23 |
| TypeScript | ~5.9.2 |
| React Navigation | 7.x |

### Estrutura do Frontend

```
curriculo-ai-frontend/src/
├── app/
│   ├── (tabs)/         # Telas principais via file-based routing
│   │   ├── home.tsx
│   │   ├── cadastro.tsx
│   │   ├── experiencia.tsx
│   │   ├── formacao.tsx
│   │   ├── certificacoes.tsx
│   │   ├── disponibilidade.tsx
│   │   ├── perfil.tsx
│   │   ├── curriculo_novo.tsx
│   │   └── analise_curriculo.tsx
│   ├── login.tsx
│   └── _layout.tsx
├── components/         # Componentes reutilizáveis
├── context/            # Contextos React (dados do currículo, perfil)
├── services/           # Comunicação com a API
├── hooks/              # Custom hooks
├── types/              # Tipos TypeScript
└── utils/              # Utilitários (ex: formatação de datas)
```

### Como rodar o Frontend

**Pré-requisitos:** Node.js 18+, Expo CLI

```bash
cd curriculo-ai-frontend

npm install

# Configurar a URL da API no .env
cp .env.example .env
# Edite o .env com a URL do backend

npx expo start
```

Escaneie o QR code com o **Expo Go** (Android/iOS) ou rode no emulador.

### Variáveis de Ambiente (Frontend)

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```

---

## 🤖 Integração com IA (Cerebras)

O coração do projeto é o `CerebrasService`, que recebe os dados completos do usuário e constrói um prompt detalhado para gerar um currículo profissional em Markdown.

O prompt segue as boas práticas de:
- Otimização para sistemas ATS
- Verbos de ação fortes em cada experiência
- Estrutura padronizada (Resumo → Habilidades → Experiência → Educação → Certificações → Idiomas)
- Output 100% em português brasileiro (exceto nomes de tecnologias)

O resultado em Markdown é então convertido para **PDF** via `PdfService`.

---

## 📋 Endpoints Principais

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/usuario` | Cadastrar usuário |
| `POST` | `/login` | Autenticar e obter JWT |
| `GET` | `/usuario/me` | Buscar todos os dados do usuário |
| `POST` | `/experiencia` | Adicionar experiência |
| `POST` | `/formacao` | Adicionar formação |
| `POST` | `/certificacao` | Adicionar certificação |
| `POST` | `/idioma` | Adicionar idioma |
| `POST` | `/disponibilidade` | Cadastrar disponibilidade |
| `POST` | `/cerebras/gerar-curriculo` | Gerar currículo com IA |
| `POST` | `/cerebras/analisar-curriculo` | Analisar currículo com IA |

> A documentação completa dos endpoints está disponível no Swagger UI após subir a aplicação.

---

## 📄 Licença

Este projeto está sob a licença MIT.