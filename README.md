# crud-client-contacts-TypeORM

### ▪️ Front-end

O Back-end desse projeto se encontra no link: https://github.com/thaygobajgar/crud-client-contacts-react

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
  - [Iniciando API](#34-iniciando-servidor)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://github.com/colinhacks/zod)

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](DER.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Iniciando servidor

Execute a API com o comando:

```
yarn dev
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

- [JsonWebToken](https://jwt.io/)

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Clients](#1-clients)
  - [POST - /clients](#11-criação-de-cliente)
  - [GET - /clients/profile](#12-listar-cliente-por-token)
- [Login](#13-login)
- [Contacts](#2-contacts)

---

## 1. **Clients**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo     | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do cliente |
| firstName | string | O primeiro nome do cliente.    |
| lastName  | string | O sobrenome do cliente.        |
| email     | string | O e-mail do cliente.           |
| password  | string | A senha de acesso do cliente   |

### Endpoints

| Método | Rota             | Descrição                              |
| ------ | ---------------- | -------------------------------------- |
| POST   | /clients         | Criação de um cliente.                 |
| GET    | /clients/profile | Lista um cliente usando seu token para |
|        |                  | identificar o mesmo                    |

---

### 1.1. **Criação de Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
POST /cliens
Host: localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "firstName": "Fulano",
  "lastName": "Beltrano",
  "email": "fulanob@mail.com",
  "password": "Abc123!@#",
  "phone": "+5511987654321"
}
```

### Schema de Validação com Yup:

```javascript
  firstName: z.string().max(50).min(3),
  lastName: z.string().max(50).min(3),
  email: z.string().email().max(127).min(9),
  password: z
    .string()
    .max(20)
    .min(6)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  phone: z.string().max(14).min(14),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "firstName": "Fulano",
  "lastName": "Beltrano",
  "email": "fulanob@mail.com",
  "phone": "+5511987654321",
  "id": "a23527b6-d712-4629-9e7d-ae3493810909",
  "createdAt": "2023-03-29T15:20:23.132Z",
  "updatedAt": "2023-03-29T15:20:23.132Z",
  "deletedAt": null,
  "isAdm": false,
  "isActive": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição                    |
| -------------- | ---------------------------- |
| 409 Conflict   | "Client already registered". |
| 400 Conflict   | ""Invalid email"".           |

---

### 1.2. **Listar Usuário por Token**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:profile`

### Exemplo de Request:

```
GET /clients/profile
Host: hlocalhost:3000
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "firstName": "Fulano",
  "lastName": "Beltrano",
  "email": "fulanob@mail.com",
  "phone": "+5511987654321",
  "id": "a23527b6-d712-4629-9e7d-ae3493810909",
  "createdAt": "2023-03-29T15:20:23.132Z",
  "updatedAt": "2023-03-29T15:20:23.132Z",
  "deletedAt": null,
  "isAdm": false,
  "isActive": true,
  "contacts": [
    {
      "firstName": "Contato",
      "lastName": null,
      "email": "contato@mail.com",
      "phone": "+5511912345678",
      "id": "6fbea4be-3d0f-4112-a9b2-ebf14b8d3bc1",
      "createdAt": "2023-03-26T01:59:28.384Z",
      "updatedAt": "2023-03-26T01:59:28.384Z",
      "deletedAt": null
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | User not found. |

---

### 1.3. **Atualização de Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
PATCH /cliens
Host: localhost:3000/
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "firstName": "Fulano PATCHED"
}
```

### Schema de Validação com Yup:

```javascript
  firstName: z.string().max(50).min(3),
  lastName: z.string().max(50).min(3),
  email: z.string().email().max(127).min(9),
  password: z
    .string()
    .max(20)
    .min(6)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  phone: z.string().max(14).min(14),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "firstName": "Fulano PATCHED",
  "lastName": "Beltrano",
  "email": "fulanob@mail.com",
  "phone": "+5511987654321",
  "id": "a23527b6-d712-4629-9e7d-ae3493810909",
  "createdAt": "2023-03-29T15:20:23.132Z",
  "updatedAt": "2023-03-29T15:20:23.132Z",
  "deletedAt": null,
  "isAdm": false,
  "isActive": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 400 Conflict   | ""Invalid email"". |

---

### 1.4. **Deleção de Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
DELETE /cliens
Host: localhost:3000/
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
{}
```

### Exemplo de Response:

```
204 No-content
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | "Client not Found". |

---

### 1.5. **Login do Client**

[ Voltar aos Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:

```
POST /login
Host: localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```
{
	"email": "fulanob@mail.com",
	"password": "Abc123!@#"
}
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2ODAxMDMyMjIsImV4cCI6MTY4MDE4OTYyMiwic3ViIjoiMjhhODc2MjktMDI0Zi00NTZhLTk1YmUtN2Y4NDViZGJkM2E1In0.BvTJR3YYChAdc1vaexFPgjD_L4WcUBTjF4ibUM4e7N4"
  }
]
```

### Possíveis Erros:

| Código do Erro  | Descrição       |
| --------------- | --------------- |
| 400 Bad Request | User not found. |

---

### 1.6. **Criação de Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/contacts`

### Exemplo de Request:

```
POST /contacts
Host: localhost:3000/
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "firstName": "Ciclano",
  "email": "ciclano@mail.com",
  "phone": "+5511912345678"
}
```

### Schema de Validação com Yup:

```javascript
  firstName: z.string().max(50).min(3),
  lastName: z.string().max(50).min(3).notRequired(),
  email: z.string().email().max(127).min(9),
  phone: z.string().max(14).min(14),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "firstName": "Ciclano",
  "lastName": null,
  "email": "fulanob@mail.com",
  "phone": "+5511912345678",
  "id": "a23527b6-d712-4629-9e7d-ae3493810909",
  "createdAt": "2023-03-29T15:20:23.132Z",
  "updatedAt": "2023-03-29T15:20:23.132Z",
  "deletedAt": null,
  "client": {
    "firstName": "Fulano",
    "lastName": "Beltrano",
    "email": "fulanob@mail.com",
    "phone": "+5511987654321",
    "id": "a23527b6-d712-4629-9e7d-ae3493810909",
    "createdAt": "2023-03-29T15:20:23.132Z",
    "updatedAt": "2023-03-29T15:20:23.132Z",
    "deletedAt": null,
    "isAdm": false,
    "isActive": true
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição                    |
| -------------- | ---------------------------- |
| 409 Conflict   | "Client already registered". |
| 400 Conflict   | ""Invalid email"".           |

---
