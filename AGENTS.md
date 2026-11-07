# AGENTS.md — Guia de Engenharia Assistida por IA (Codex & Antigravity)

Este documento estabelece o contrato operacional, arquitetural e de segurança para todos os agentes de Inteligência Artificial (incluindo **Codex**, **Antigravity** e assistentes no **Cursor**) que atuam no repositório **Coroas de Concreto**.

---

## 1. Visão do Projeto

**Coroas de Concreto** é um universo de RPG cinematográfico e uma aplicação web Full Stack construída com **TypeScript**, **Next.js** e **NestJS**.

O objetivo é criar um produto de alto padrão visual e técnico, mantendo código limpo, modular, testável e rigorosamente documentado.

---

## 2. Regras Inegociáveis de Segurança e Privacidade

1. **Repositório Público:** Este repositório é público (`Luispof/coroas-de-concreto`). Tudo o que é commitado torna-se imediatamente visível.
2. **Proibição de Spoilers e Arquivos Privados de RPG:**
   - **NUNCA** acesse, copie, referencie ou importe arquivos de pastas pessoais de RPG fora deste repositório.
   - **NUNCA** inclua segredos de campanha, tramas confidenciais do narrador ou informações privadas de jogadores no código, testes, comentários, seeds ou documentação.
3. **Zero Credenciais e Ambiente Profissional:**
   - **NUNCA** faça commit de arquivos `.env`, chaves de API, tokens, certificados ou credenciais.
   - **NUNCA** utilize configurações, pacotes internos ou credenciais pertencentes a ambientes profissionais/corporativos.
4. **Escopo de Diretório:** Opere exclusivamente dentro da raiz do checkout deste repositório, independentemente do sistema operacional ou caminho local. Não acesse materiais privados externos.

---

## 3. Fluxo de Trabalho (Tasks `CDC-XXX`)

O desenvolvimento é orientado por tarefas numeradas no formato `CDC-XXX` (ex.: `CDC-001`, `CDC-002`):

1. **Planejamento antes da execução:** Ao receber uma tarefa `CDC-XXX`, analise o impacto arquitetural, apresente o plano objetivo e aguarde validação quando envolver decisões estruturais ou ações externas.
2. **Escopo controlado:** Execute apenas o que foi solicitado na tarefa atual. Não instale pacotes, não crie módulos extras e não altere configurações fora do escopo aprovado.
3. **Verificação pré-commit:** Sempre inspecione `git status` e `git diff --cached --name-only` antes de realizar qualquer commit para garantir que nenhum arquivo indevido seja incluído.
4. **Git Workflow — Frequent Atomic Commits (*"Mudou, commitou"*):**
   - Adote commits pequenos, frequentes e atômicos para registrar a evolução real do projeto.
   - Não existe limite de commits por tarefa: faça commit após cada alteração pequena, coerente e validada.
   - Não acumule várias alterações independentes em um único commit e nunca faça commits vazios.
   - Revise o diff e execute as validações pertinentes antes de cada commit.
   - Revise integralmente o conteúdo preparado com `git diff --cached`, procurando credenciais, dados privados e spoilers antes de cada commit, independentemente do `.gitignore`.
   - Não execute `git push` automaticamente sem autorização explícita ou regra previamente aprovada.
   - Trabalhe em branches curtas por tarefa e integre por Pull Requests. Preserve os commits atômicos por merge commit; evite squash merge e não reescreva o histórico publicado da `main`.
5. **Padrão de Commits:** Utilize *Conventional Commits* referenciando o ID da tarefa (`CDC-XXX`):
   - `feat(CDC-XXX): ...`
   - `fix(CDC-XXX): ...`
   - `docs(CDC-XXX): ...`
   - `chore(CDC-XXX): ...`
   - `refactor(CDC-XXX): ...`

---

## 4. Diretrizes de Arquitetura e Código

- **Linguagem Padrão:** TypeScript com tipagem estrita (`strict: true`). Evite `any`; prefira tipos explícitos, interfaces claras e validação de esquemas na fronteira da aplicação.
- **Frontend (Next.js):** Foco em experiência cinematográfica, performance, acessibilidade, componentização limpa e separação entre componentes de UI e lógica de estado/dados.
- **Backend (NestJS):** No MVP, utilize Controllers, Services, DTOs e acesso Prisma, com separação clara de responsabilidades. Não crie camadas genéricas de Repository ou Use Case sem necessidade concreta.
- **Proporcionalidade:** No MVP, use apenas as camadas necessárias. Não crie abstrações genéricas, pacotes compartilhados ou módulos sem uso concreto.
- **Compatibilidade:** Preserve Windows e macOS; use caminhos relativos, imports com capitalização exata e comandos portáveis. Scripts futuros devem evitar dependência exclusiva de Bash ou PowerShell.
- **Documentação Arquitetural:**
  - Visões técnicas, fluxos e diagramas devem residir em [`docs/architecture/`](./docs/architecture/).
  - Decisões arquiteturais relevantes devem ser registradas como ADRs em [`docs/adr/`](./docs/adr/).

---

## 5. Cooperação entre Codex e Antigravity

- Mantenha este arquivo (`AGENTS.md`), a documentação em `docs/` e as configurações compartilháveis em `.vscode/` sempre atualizados à medida que a arquitetura evoluir.
- Preserve comentários, docstrings e decisões documentadas em ADRs anteriores, a menos que uma nova ADR substitua explicitamente uma decisão antiga.
