# Modelo conceitual mínimo

O modelo descreve somente conteúdo público. Não é um schema Prisma nem inclui personagens, clãs ou fatos narrativos reais.

| Entidade | Campo | Regra conceitual |
|---|---|---|
| Personagem | id | Identificador técnico estável; formato definido no schema futuro |
| Personagem | slug | Obrigatório e único entre personagens; identificador da URL |
| Personagem | name | Nome público obrigatório |
| Personagem | summary | Resumo público curto obrigatório |
| Personagem | description | Texto público obrigatório; texto simples no MVP |
| Personagem | clanId | Vínculo opcional com um clã existente |
| Clã | id | Identificador técnico estável |
| Clã | slug | Obrigatório e único entre clãs |
| Clã | name | Nome público obrigatório |

Um clã pode ter zero ou muitos personagens; um personagem pertence a zero ou um clã. A ausência de vínculo é representada como `clan: null` na API. Não deduzir regras narrativas adicionais dessa cardinalidade.

Slugs usam letras latinas minúsculas sem acentos, números e hífens entre segmentos. Não podem estar vazios, começar ou terminar com hífen. Os limites de comprimento e o tipo dos IDs devem ser fixados no schema e no contrato HTTP durante a implementação. Alterar slugs publicados exige avaliar links existentes; não presumir renomeação automática.

Preservar integridade referencial e impedir exclusão de clã referenciado até reassociação explícita. Migrations devem refletir as restrições de unicidade e vínculo. As regras de carga e manutenção dependem da estratégia editorial; nenhuma operação de escrita será disponibilizada na API do MVP.

Não incluir usuários, permissões, campanhas, fichas privadas, campos secretos, mídia, tabelas genéricas ou status editorial antecipadamente. A base pública armazena apenas conteúdo publicável; um indicador de visibilidade não substitui essa regra. IDs técnicos não precisam integrar a resposta HTTP.
