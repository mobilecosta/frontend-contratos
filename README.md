# Frontend Contratos - Angular

Frontend em **Angular 18** para autenticação e gestão de **clientes**, **produtos** e **contratos**.

## Alterações de Vite + React para Angular

Este projeto foi migrado de **Vite + React** para **Angular 18**. As principais mudanças incluem:

- ✅ Conversão de componentes React para Angular components standalone
- ✅ Migração de React Router para Angular Router
- ✅ Conversão de AuthContext para AuthService com RxJS
- ✅ Substituição de Axios por HttpClient do Angular
- ✅ Estrutura de pastas seguindo padrão Angular
- ✅ Tipagem forte com TypeScript

## Funcionalidades

- Login com armazenamento de token no `localStorage`
- Rotas protegidas após autenticação com `authGuard`
- CRUD completo para:
  - Clientes (`/clientes`)
  - Produtos (`/produtos`)
  - Contratos (`/contratos`)
- Dashboard com navegação lateral
- API service centralizado com HttpClient

## Requisitos

- Node.js 18+
- Backend rodando localmente (por padrão em `http://localhost:3000/api`)

## Instalação

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:4200`

## Build

```bash
# Build para desenvolvimento
npm run build

# Build para produção
npm run build:prod

# Preview do build
npm run preview
```

## Estrutura de Pastas

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard-layout/      # Layout principal
│   │   ├── entity-crud/           # Componente CRUD reutilizável
│   │   └── protected-route/       # Proteção de rotas
│   ├── pages/
│   │   ├── login-page/
│   │   ├── dashboard-page/
│   │   ├── clientes-page/
│   │   ├── produtos-page/
│   │   └── contratos-page/
│   ├── services/
│   │   ├── api.service.ts         # Serviço HTTP centralizado
│   │   └── auth.service.ts        # Autenticação e estado do usuário
│   ├── models/
│   │   └── types.ts               # Interfaces e tipos
│   ├── guards/
│   │   └── auth.guard.ts          # Guard de proteção de rotas
│   ├── app.routes.ts              # Configuração de rotas
│   ├── app.component.ts           # Componente raiz
│   ├── app.component.html
│   └── app.component.css
├── main.ts                         # Bootstrap da aplicação
├── styles.css                      # Estilos globais
└── index.html
```

## Configuração da API

Por padrão, a API está configurada para `http://localhost:3000/api`. Para alterar, edite:

```typescript
// src/app/services/api.service.ts
private baseURL = 'http://seu-backend.com/api';
```

## Integração com Backend

Este frontend foi preparado para consumir endpoints REST com o seguinte padrão:

- `POST /auth/login`
- `GET/POST /clientes`
- `PUT/DELETE /clientes/:id`
- `GET/POST /produtos`
- `PUT/DELETE /produtos/:id`
- `GET/POST /contratos`
- `PUT/DELETE /contratos/:id`

Ajuste os serviços em `src/app/services/` conforme necessário.

## Scripts Disponíveis

- `npm run start` - Inicia servidor de desenvolvimento
- `npm run dev` - Inicia servidor com live reload
- `npm run build` - Build para produção
- `npm run test` - Executa testes
- `npm run lint` - Verifica qualidade do código

## Autenticação

A autenticação está implementada com mock de dados. Para integrar com um backend real:

1. Edite `src/app/services/auth.service.ts`
2. Implemente as chamadas reais de API
3. Configure as variáveis de ambiente conforme necessário

## Componentes Reutilizáveis

### EntityCrud
Componente genérico para CRUD de entidades. Exemplo de uso:

```typescript
<app-entity-crud
  title="Cliente"
  [items]="clientes"
  [columns]="['nome', 'email', 'telefone']"
  (create)="onCreate($event)"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)"
></app-entity-crud>
```

## Styling

O projeto usa CSS puro com variáveis CSS globais. Os estilos estão em:
- Globais: `src/styles.css`
- Por componente: `src/app/components/**/*.css`

