# Arquitetura do Sistema — Coroas de Concreto

Este diretório armazena a documentação técnica, diagramas (Mermaid/C4), modelos de domínio e especificações de arquitetura do projeto **Coroas de Concreto**.

## Contrato inicial — CDC-003

O MVP é um catálogo público de personagens com página individual. Não possui autenticação, escrita pela API, endpoints administrativos ou real-time. As decisões de stack e acesso foram aprovadas na CDC-003; os detalhes abaixo orientam a futura implementação e podem ser revistos por ADR.

- [MVP, responsabilidades e critérios de aceite](./mvp.md)
- [Modelo conceitual mínimo](./domain-model.md)
- [Decisões pendentes](./pending-decisions.md)
- [Proteção de conteúdo](./security.md)
- [Registro de decisões](../adr/README.md)

## Monorepo planejado

```text
apps/
  web/          Next.js + TypeScript
  api/          NestJS + TypeScript
    prisma/     Schema e migrations
docs/
  architecture/
  adr/
```

Esta árvore é uma previsão, não uma estrutura já implementada. O workspace pnpm terá um lockfile na raiz. Não criar pacotes compartilhados, orquestradores adicionais ou abstrações genéricas sem necessidade concreta. Versões de Node, pnpm e dependências serão definidas e registradas na tarefa de scaffold; não foram instaladas nesta etapa.

## Compatibilidade

Windows e macOS são ambientes suportados para desenvolvimento. Usar UTF-8, LF, caminhos relativos e capitalização exata em imports. Comandos futuros devem ser portáveis e não depender exclusivamente de Bash ou PowerShell. Não exigir symlinks criados manualmente. Validar instalação e comandos documentados nos dois sistemas na fundação executável; a CDC-003 valida apenas os arquivos documentais e de padronização.

> **Nota de Segurança:** Nenhum documento neste diretório deve conter spoilers confidenciais da crônica ou credenciais de infraestrutura.
