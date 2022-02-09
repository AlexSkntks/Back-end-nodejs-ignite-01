# Back-end-nodejs-ignite-01
Desafio 01 da trilha de nodejs do curso ignite da Rocketseat.

Essa será uma aplicação para gerenciar tarefas (em inglês *todos*). Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*:

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header).

## Template da aplicação

[Link](https://github.com/rocketseat-education/ignite-template-conceitos-do-nodejs)

Após clonar o repositório, instale todas as dependências com

    npm install

## Requisições da aplicação

- POST `/users`

    A rota deve receber `name`, e `username` dentro do corpo da requisição.

        { 
            name: "Fulano"
            username: "FulanTrex"
        }

- GET `/todos`

    A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e retorna uma lista com todas as tarefas desse usuário.

- POST `/todos`

    A rota deve receber `title` e `deadline` dentro do corpo da requisição e, uma propriedade `username` contendo o username do usuário dentro do header da requisição. Exemplo de body:

        { 
            title: "Ir a biblioteca"
            username: "2020-02-21"
        }

    O _todo_ tem a estrutura:

        { 
            id: 'uuid', // precisa ser um uuid
            title: 'Nome da tarefa',
            done: false, 
            deadline: '2021-02-27T00:00:00.000Z', 
            created_at: '2021-02-22T00:00:00.000Z'
        }

- PUT `/todos/:id`

    A rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e receber as propriedades `title` e `deadline` dentro do corpo, para editar o *todo* do usuário.

- PATCH `/todos/:id/done`

    A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e altera a propriedade `done` para `true` no *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota. O id é um _uuid_. Em outras palavras, marca um *todo* como concluído.

- DELETE `/todos/:id`

    A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e excluir o *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

## Regras

1. Não deve ser possível criar um usuário com username já existente.
2. Não deve ser possível editar/apagar/marcar como concluído um *todo* com id que não existe.
3. Não deve ser possível buscar a lista de *todos* de um usuário não existente.
4. Não deve ser possível criar um *todo* para um usuário que não existe

## Testes

Você pode testar cada requisição fazendo uso do `insomnia` ou rodar o comando:

    npm tests
