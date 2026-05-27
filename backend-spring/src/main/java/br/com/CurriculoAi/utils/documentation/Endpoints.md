# 📄 CurriculoAi — API

API REST desenvolvida em **Java com Spring Boot** para geração e gerenciamento de currículos. O fluxo principal consiste em criar um usuário, fazer login e, em seguida, preencher progressivamente as seções do currículo utilizando o token retornado em cada etapa.

---

## 🔐 Autenticação

A maioria dos endpoints exige um **token** passado como `query parameter` (`?token=...`). Esse token é retornado no corpo da resposta ao criar um usuário.

---

## 📌 Endpoints

### 👤 Usuário — `/usuario`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/usuario/create` | Cria um novo usuário |
| `POST` | `/usuario/login` | Autentica o usuário e retorna o token |
| `GET` | `/usuario/{id}` | Busca um usuário pelo ID |
| `GET` | `/usuario/me` | Retorna os dados completos do usuário autenticado |
| `DELETE` | `/usuario/delete/{id}` | Remove um usuário pelo ID |

**`POST /usuario/create`**
Cria um novo usuário. Retorna um `UsuarioTokenIdentResponseDto` contendo o token de identificação para uso nos próximos passos.

**`POST /usuario/login`**
Recebe as credenciais no body e retorna o token de acesso como string.

**`GET /usuario/me`**
Retorna o perfil completo do usuário autenticado, incluindo todas as seções do currículo já preenchidas (`UsuarioFullContentDtoResponse`).

---

### 🗂️ Área — `/area`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/area/add` | Associa uma área de atuação ao usuário |

**`POST /area/add`**
Recebe um `AreaUserAddDtoRequest` no body com a área desejada e retorna o `UsuarioTokenIdentResponseDto` atualizado.

---

### 🎓 Formação — `/formacao`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/formacao/add` | Adiciona formações acadêmicas ao usuário |

**`POST /formacao/add`**
Recebe uma lista de `FormacaoDtoRequest` no body e o token via query param. Retorna o `UsuarioTokenIdentResponseDto` atualizado.

```
POST /formacao/add?token=seu_token
```

---

### 📜 Certificação — `/certificacao`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/certificacao/register` | Registra certificações do usuário |

**`POST /certificacao/register`**
Recebe uma lista de `CertificacaoDtoRequest` no body e o token via query param.

```
POST /certificacao/register?token=seu_token
```

---

### 💼 Experiência — `/experiencia`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/experiencia/register` | Registra experiências profissionais do usuário |

**`POST /experiencia/register`**
Recebe uma lista de `ExperienciaDtoRequest` no body e o token via query param.

```
POST /experiencia/register?token=seu_token
```

---

### 📅 Disponibilidade — `/disponibilidade`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/disponibilidade/register` | Registra a disponibilidade do usuário |

**`POST /disponibilidade/register`**
Recebe um `DisponibilidadeDtoRequest` no body e o token via query param.

```
POST /disponibilidade/register?token=seu_token
```

---

### 🌍 Idiomas — `/idiomas/user`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/idiomas/user/register` | Registra os idiomas do usuário |

**`POST /idiomas/user/register`**
Recebe uma lista de `IdiomaUserDtoRequest` no body e o token via query param. Diferente dos outros endpoints, retorna um `UsuarioFullContentDtoResponse` com o perfil completo.

```
POST /idiomas/user/register?token=seu_token
```


## 🔄 Fluxo de uso recomendado

```
1. POST /usuario/create          → obtém o token
2. POST /usuario/login           → autentica e obtém o token
3. POST /area/add                → define a área de atuação
4. POST /formacao/add            → adiciona formações
5. POST /certificacao/register   → adiciona certificações
6. POST /experiencia/register    → adiciona experiências
7. POST /disponibilidade/register → define disponibilidade
8. POST /idiomas/user/register   → adiciona idiomas
9. GET  /usuario/me              → visualiza o currículo completo
```

---

## 📦 Tecnologias

- Java + Spring Boot
- Swagger / OpenAPI (disponível via `/swagger-ui.html`)
- Autenticação por token

---

## 📝 Documentação interativa

Com a aplicação rodando, acesse:

```
http://localhost:8080/swagger-ui.html
```