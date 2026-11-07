# ADR 0003: Catálogo público com API REST de leitura

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-003

## Contexto

O primeiro fluxo aprovado é consultar personagens e suas páginas individuais. O repositório é público e não pode receber materiais privados ou spoilers.

## Decisão

Disponibilizar acesso totalmente público, sem autenticação. A API REST usa o prefixo `/api/v1` e expõe apenas consultas do catálogo e detalhe descritas no [contrato mínimo](../architecture/mvp.md). Não implementar endpoints administrativos ou escrita de negócio. A base contém exclusivamente conteúdo público aprovado, sem campos secretos. Não criar endpoint independente de clãs sem necessidade do fluxo.

## Alternativas consideradas

- Autenticação e permissões: adicionam escopo sem necessidade de acesso restrito neste MVP.
- CRUD administrativo: depende de estratégia editorial ainda pendente e contraria o recorte de leitura.
- GraphQL ou real-time: não há requisito que justifique seu custo no catálogo.
- Armazenar dados privados com filtro de visibilidade: aumenta o risco de exposição e viola a política da base pública.

## Consequências

O fluxo é pequeno e acessível sem sessão. Todo dado retornado pode ser consultado por qualquer pessoa; não há confidencialidade por URL. A manutenção dos dados requer procedimento externo à API, ainda não escolhido. Seleção de campos, validação e mensagens de erro públicas continuam necessárias.

## Critérios de revisão

Reavaliar antes de introduzir escrita, conteúdo restrito, novos consumidores com requisitos incompatíveis ou volume que exija paginação. Alterações incompatíveis de contrato exigem avaliar versionamento e migração dos consumidores.
