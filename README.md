# Node Test

Este projeto foi criado com o intuito de consumir uma outra API, obtendo uma lista com grande volume de dados, onde são realizadas buscas de informações complementares para para registro.

## Informações Técnicas


O projeto foi desenvolvido utilizando o `NodeJs na versão v8.9.4`
Porta de acesso: `3000`


## Rotas de Acesso
Foram disponibilizadas duas rotas de acesso:

A rota: `/people/:amountPerStep/:numberOfAttempts`

Onde `amountPerStep` representa a quantidade de conexões simultâneas que o servidor criará ao buscar as informações complementares e o `numberOfAttempts` representa a quantidade de tentativas máxima que o servidor poderá realizar na busca de cada informação complementar.
Exemplo:`http://localhost:3000/people/3000/20`

A rota: `/people`, apresenta o mesmo comportamento do outra rota, mas ao utilizá-la, serão atribuídos por padrão os valores `amountPerStep=1000` e `numberOfAttempts=20`

**Observação**: Elevar o valor do atributo `amountPerStep` poderá diminuir o tempo de resposta das consultas, mas aumentará o consumo de harware e poderá causar uma sobrecarregar o servidor externo.