# Node Test

Este projeto foi criado com o intuito de consumir uma outra API, obtendo uma lista com grande volume de dados, onde são realizadas buscas de informações complementares para para registro.

## Informações Técnicas


O projeto foi desenvolvido utilizando o `NodeJs na versão v8.9.4`
Porta de acesso: `3000`


## Rotas de Acesso
Foram disponibilizadas duas rotas de acesso:

A rota: `/people/:amountPerStep/:numberOfAttempts`

Onde `amountPerStep` representa a quantidade de conexões simultâneas que o servidor criará ao buscar as informações complementares e o `numberOfAttempts` representa a quantidade de tentativas máxima que o servidor poderá realizar na busca de cada informação complementar.

A rota: `/people`, apresenta o mesmo comportamento do outra rota, mas ao utilizá-la, serão atribuídos por padrão os valores `amountPerStep=1000` e `numberOfAttempts=20`

**Observação**: Os atributos `amountPerStep` e `numberOfAttempts` foram criados com o intuito de gerenciar o quantidade máxima de conexão simultâneas diminuindo o tempo de processamento e evitando sobrecarga de hardware tanto da máquina quanto do servidor externo, contudo os valores definidos como padrões podem não ser os ideais em todos os senários.