# ADR 0005: Histórico atômico e desenvolvimento Windows/macOS

- **Data:** 2026-11-07
- **Status:** Aceito
- **Task Relacionada:** CDC-003

## Contexto

O projeto público é desenvolvido com assistência de IA. Precisa de mudanças revisáveis, proteção de conteúdo e convenções que não dependam do caminho de um computador.

## Decisão

Usar branches curtas por tarefa, PRs e commits pequenos, frequentes e atômicos: mudou, validou, commitou. Integrar por merge commit para preservar os commits; evitar squash e reescrita da `main`. Manter Conventional Commits com CDC-XXX. Revisar conteúdo sensível no diff preparado antes de cada commit, independentemente do ignore. Push depende de autorização explícita.

Suportar Windows e macOS com raiz relativa ao checkout, UTF-8, LF e espaços definidos em `.editorconfig` e `.gitattributes`. Scripts futuros devem ser portáveis e imports respeitar capitalização. Ver [proteção de conteúdo](../architecture/security.md).

## Alternativas consideradas

- Commits grandes ao fim da tarefa ou squash como padrão: reduzem a granularidade do histórico que se deseja preservar.
- Alterações diretamente na main: retiram a etapa de revisão por PR.
- Convenções pessoais de editor e scripts exclusivos de um shell: dificultam reprodução entre sistemas.
- Confiar somente no `.gitignore`: não detecta dados sensíveis dentro de arquivos permitidos.

## Consequências

O histórico mantém unidades de mudança e decisões rastreáveis, com mais commits e merge commits. A revisão pré-commit é obrigatória mesmo para documentação. As regras são documentais; proteção remota, configuração de merge no GitHub e testes nos dois sistemas não foram executados nesta tarefa.

## Critérios de revisão

Reavaliar se a equipe ou os controles de integração mudarem. Novos tipos de arquivo exigem rever atributos e exclusões. Validar scripts em Windows e macOS quando existir fundação executável; não declarar compatibilidade testada apenas pela presença desses arquivos.
