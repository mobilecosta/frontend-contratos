# Frontend Contratos

Frontend em React + Vite para autenticação e gestão de **clientes**, **produtos** e **contratos**.

## Funcionalidades

- Login com armazenamento de token JWT no `localStorage`.
- Rotas protegidas após autenticação.
- CRUD completo para:
  - Clientes (`/clientes`)
  - Produtos (`/produtos`)
  - Contratos (`/contratos`)
- Configuração da URL da API por variável de ambiente (`VITE_API_URL`).

## Requisitos

- Node.js 18+
- Backend rodando localmente (por padrão em `http://localhost:8080`)

## Instalação

```bash
npm install
cp .env.example .env
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Integração com backend

Este frontend foi preparado para consumir endpoints REST com o seguinte padrão:

- `POST /auth/login`
- `GET/POST /clientes`
- `PUT/DELETE /clientes/:id`
- `GET/POST /produtos`
- `PUT/DELETE /produtos/:id`
- `GET/POST /contratos`
- `PUT/DELETE /contratos/:id`

Caso os nomes dos campos ou rotas no backend sejam diferentes, ajuste os arquivos em `src/services` e `src/pages`.
