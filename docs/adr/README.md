# Architecture Decision Records (ADR)

Este diretório contém os registros de decisões arquiteturais (**ADRs**) do projeto **Coroas de Concreto**.

## O que é um ADR?

Um **Architecture Decision Record** é um documento curto que captura uma decisão arquitetural importante feita ao longo do projeto, juntamente com seu contexto e suas consequências.

## Convenção de Nomenclatura

Os arquivos devem seguir o formato sequencial:

`NNNN-titulo-da-decisao.md` (ex.: `0001-estrutura-inicial-do-repositorio.md`)

## Template Base

```markdown
# ADR NNNN: [Título Curto da Decisão]

- **Data:** YYYY-MM-DD
- **Status:** Proposto | Aceito | Substituído | Depreciado
- **Task Relacionada:** CDC-XXX

## Contexto
Qual é o problema ou necessidade técnica/arquitetural que motiva esta decisão?

## Decisão
Qual foi a abordagem escolhida e por quê?

## Consequências
- **Positivas:** Benefícios diretos e ganhos de qualidade/produtividade.
- **Negativas / Trade-offs:** Custos, limitações ou cuidados necessários.
```
