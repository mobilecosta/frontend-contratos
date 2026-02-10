/* Metas sobre como funciona o monorepo Vite */

# Metas
- [ ] Remover vite.config.ts (não é mais necessário)
- [ ] Remover tsconfig.app.json da raiz (agora mantem-se)
- [ ] Remover tsconfig.node.json da raiz (agora mantem-se)
- [ ] Executar `npm install` para baixar dependências Angular
- [ ] Testar a aplicação com `npm run dev`

# Estrutura Angular adicionada
- Framework: Angular 18
- Roteamento: Angular Router
- HTTP: HttpClient
- Estado: RxJS + BehaviorSubject
- Componentes: Standalone Components
- Proteção de rotas: authGuard

# Próximas etapas
1. Instalação de dependências: `npm install`
2. Iniciar desenvolvimento: `npm run dev`
3. Acessar em: http://localhost:4200

# Notas importantes
- A autenticação está usando mock. Conecte com seu backend
- A API base está em http://localhost:3000/api. Altere conforme necessário
- Todos os componentes são standalone
