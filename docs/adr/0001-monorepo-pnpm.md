# ADR 0001: Monorepo com pnpm workspaces

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-003

## Contexto

Web e API pertencem ao mesmo produto e precisam evoluir em tarefas e PRs coordenados, com uma fundação pequena para desenvolvimento individual assistido por IA.

## Decisão

Usar pnpm workspaces, com futuras aplicações em `apps/web` e `apps/api` e um lockfile na raiz. Não criar pacotes compartilhados ou adicionar um orquestrador de builds no MVP. Versões e arquivos executáveis serão definidos na tarefa de scaffold.

## Alternativas consideradas

- Repositórios separados: adicionam coordenação de mudanças e configuração duplicada sem necessidade atual.
- Workspaces npm ou Yarn: poderiam atender ao escopo, mas pnpm foi a opção aprovada; não haverá múltiplos lockfiles.
- Turborepo ou Nx desde o início: não há grafo de tarefas ou custo de build que justifique sua inclusão agora.

## Consequências

Mudanças coordenadas ficam em um PR e a instalação tem uma referência única. O workspace exige disciplina nas dependências e compatibilidade das versões. Compartilhamento futuro deve ser motivado por uso real, sem acoplar o frontend ao ORM.

## Critérios de revisão

Reavaliar quando builds medidos exigirem cache/orquestração, surgir código compartilhado concreto ou equipes e ciclos de entrega independentes justificarem separar repositórios.
