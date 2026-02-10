# ✅ Checklist de Verificação - Migração Vite+React → Angular

## Após completar a migração, execute este checklist:

### 1. Instalação e Setup
- [ ] Executar `npm install` para instalar todas as dependências
- [ ] Verificar se `node_modules` foi criado sem erros
- [ ] Confirmar que a versão do Node.js é 18+

### 2. Estrutura de Arquivos
- [ ] Verificar pasta `src/app/` com estrutura completa
- [ ] Confirmar existência de `index.html` atualizado
- [ ] Validar `angular.json` existe e está correto
- [ ] Confirmar `tsconfig.json` com configuração Angular

### 3. Servidor de Desenvolvimento
- [ ] Executar `npm run dev` com sucesso
- [ ] Acessar `http://localhost:4200` no navegador
- [ ] Página de login deve aparecer
- [ ] Não há erros no console do navegador

### 4. Funcionalidades Básicas
- [ ] Página de login carrega normalmente
- [ ] Clicar em "Entrar" com dados de teste funciona
- [ ] Redirecionamento para dashboard após login
- [ ] Header com nome de usuário aparece
- [ ] Menu lateral com navegação está visível

### 5. Navegação
- [ ] Link "Clientes" navega para `/clientes`
- [ ] Link "Produtos" navega para `/produtos`
- [ ] Link "Contratos" navega para `/contratos`
- [ ] Voltar para página anterior funciona
- [ ] URL muda corretamente na barra de endereços

### 6. CRUD Operations
- [ ] Botão "+ Novo" abre formulário modal
- [ ] Preenchimento de campos no formulário
- [ ] Botão "Salvar" fecha modal e atualiza tabela
- [ ] Botão "Editar" abre modal com dados preenchidos
- [ ] Botão "Deletar" remove item com confirmação

### 7. Autenticação
- [ ] Token salvo no `localStorage` após login
- [ ] Usuário é armazenado no `localStorage`
- [ ] Botão "Logout" limpa dados e redireciona para login
- [ ] Acesso direto a `/` sem login redireciona para `/login`
- [ ] URL `/login` é acessível sempre

### 8. Tratamento de Erros
- [ ] Campos de formulário validam se vazios
- [ ] Mensagens de erro aparecem quando aplicável
- [ ] Erro de conexão com API é tratado (mock data aparece)
- [ ] Console não mostra erros críticos

### 9. Build e Produção
- [ ] Executar `npm run build:prod` com sucesso
- [ ] Pasta `dist/` é criada com todos os arquivos
- [ ] Executar `npm run preview` carrega página
- [ ] Tamanho do bundle é razoável (< 1MB gzipped)

### 10. TypeScript
- [ ] `npm run build` não gera erros de tipo
- [ ] Sem warnings de variáveis não utilizadas
- [ ] Tipos estão corretos em todas as páginas/componentes

### 11. Configuração da API
- [ ] Ter configurado a URL correta da API em `src/app/services/api.service.ts`
- [ ] Se usar backend real, atualizar `src/app/services/auth.service.ts`
- [ ] Validar que as chamadas HTTP funcionam corretamente

### 12. Deploy (Vercel)
- [ ] Conectar repositório ao Vercel
- [ ] Verificar build command: `npm run build`
- [ ] Verificar output directory: `dist/frontend-contratos`
- [ ] Deployment sem erros
- [ ] URL da Vercel funciona corretamente

## Resolução de Problemas Comuns

### Erro: "Cannot find module '@angular/core'"
**Solução:** Execute `npm install`

### Erro na porta 4200
**Solução:** A porta 4200 já está em uso. Mude no `angular.json` ou feche a aplicação que está usando a porta

### Componentes não carregam
**Solução:** Verifique se todos os imports estão corretos em `app.routes.ts`

### Styles não aplicam
**Solução:** Confirme que `styles.css` está importado em `angular.json`

### Erro de CORS ao chamar API
**Solução:** Configure CORS no backend ou use proxy em `angular.json`

## Próximas Integrações

Após validar que tudo funciona:

1. **Integração com Backend Real**
   - Atualizar URL da API
   - Implementar login real com JWT
   - Validar tokens

2. **Melhorias UI/UX**
   - Adicionar loading spinners
   - Melhorar validação de formulários
   - Adicionar toasts de sucesso/erro

3. **Performance**
   - Implementar lazy loading de rotas
   - Adicionar service worker para PWA
   - Otimizar images

4. **Testes**
   - Escrever testes unitários com Jasmine
   - Adicionar testes E2E com Cypress/Playwright
   - Validar cobertura de código

---

**Recomendação:** Faça o checklist item por item para garantir que a migração foi bem-sucedida! ✅
