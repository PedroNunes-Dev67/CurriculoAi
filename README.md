# CurriculoAI

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat)

Você preenche seus dados, a IA monta o currículo. Simples assim.


## O problema

A maioria dos currículos nem chega em pessoas e já cai no filtro automático (ATS). O CurriculoAI resolve isso: pega suas experiências, formações e habilidades e gera um currículo em PDF já otimizado pra passar nesses sistemas.


## Como funciona

```
você preenche os dados → IA estrutura e escreve → PDF gerado → currículo pronto
```

também análisamos currículos existentes, caso você queira feedback do que já tem.


## Estrutura

```
CurriculoAi/
├── backend-spring/        # API REST — Java 21 + Spring Boot
└── curriculo-ai-frontend/ # App mobile — React Native + Expo
```


## Backend

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)

API feita com Spring Boot. Cuida da autenticação, dados do usuário e chama a Cerebras AI pra gerar/analisar o currículo.

**Stack:**
- Java 21 + Spring Boot
- Spring Security + JWT
- JPA + PostgreSQL + Flyway
- MapStruct, Swagger, Docker

**Estrutura de pastas:**

```
backend-spring/src/main/java/br/com/CurriculoAi/
├── controllers/    # endpoints
├── services/       # lógica de negócio + integração com Cerebras
├── entities/       # entidades JPA
├── repositories/   # Spring Data
├── DTO/            # request/response
├── mapper/         # MapStruct
├── security/       # JWT
├── enums/          # ModeloDeTrabalho, NivelIdioma...
└── exceptions/     # erros globais
```

**Rodando:**

```bash
cd backend-spring
mvn spring-boot:run
```

Com Docker:

```bash
docker build -t curriculo-ai-backend .
docker run -p 8080:8080 curriculo-ai-backend
```

API em `http://localhost:8080` · Swagger em `http://localhost:8080/swagger-ui.html`

**`.env` do backend:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/curriculo_ai
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

cerebras.api.url=https://api.cerebras.ai/v1/chat/completions
cerebras.api.key=sua_chave_api_cerebras

jwt.secret=seu_segredo_jwt
```


## Frontend

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)

App mobile com React Native + Expo. Roteamento por arquivo via Expo Router.

**Stack:**
- React Native 0.81.5
- Expo ~54 + Expo Router ~6
- TypeScript ~5.9
- React Navigation 7

**Estrutura de pastas:**

```
curriculo-ai-frontend/src/
├── app/
│   ├── (tabs)/
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
├── components/
├── context/
├── services/
├── hooks/
├── types/
└── utils/
```

**Rodando:**

```bash
cd curriculo-ai-frontend
npm install
cp .env.example .env
npx expo start
```

Abre no celular com o Expo Go (iOS/Android) ou no emulador.

**`.env` do frontend:**

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```


## A parte da IA

![ChatGPT](https://img.shields.io/badge/ChatGPT-74AA9C?style=flat&logo=openai&logoColor=white)
![Cerebras](https://img.shields.io/badge/Cerebras-FF6B35?style=flat&logoColor=white)

O `CerebrasService` pega tudo que o usuário preencheu e manda pra Cerebras com um prompt bem estruturado. O prompt segue:

- verbos de ação em cada experiência
- ordem fixa: Resumo → Habilidades → Experiência → Educação → Certificações → Idiomas
- tudo em português (tecnologias ficam em inglês mesmo)

O retorno vem em Markdown e o `PdfService` converte pra PDF.


## Endpoints

| Método | Rota | O que faz |
|--------|------|-----------|
| `POST` | `/usuario` | cria conta |
| `POST` | `/login` | autentica e devolve JWT |
| `GET` | `/usuario/me` | retorna todos os dados do usuário |
| `POST` | `/experiencia` | adiciona experiência |
| `POST` | `/formacao` | adiciona formação |
| `POST` | `/certificacao` | adiciona certificação |
| `POST` | `/idioma` | adiciona idioma |
| `POST` | `/disponibilidade` | salva disponibilidade |
| `POST` | `/cerebras/gerar-curriculo` | gera o currículo com IA |
| `POST` | `/cerebras/analisar-curriculo` | analisa currículo com IA |

Documentação completa no Swagger depois de subir a API.

---

## Licença

![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat)
