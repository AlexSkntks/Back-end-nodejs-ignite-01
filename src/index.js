const express = require('express');

const app = express();

const { v4:uuidv4 } = require("uuid");

const cors = require('cors');
const res = require('express/lib/response');
const req = require('express/lib/request');

app.use(express.json());
app.use(cors());

// O user é passado pelo header em TODAS as requisições. Ele é identificado pelo username
const users = [];

app.get("/", (req, res)=>{
  return res.json({nome: "Alex Oliveira"});
})

//Verifica se o user passado pelo header já existe
function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if(!user){
    return response.status(404).json({error: "User not found!"});
  }
  request.user = user;
  return next();
}

//Verifica se o user passado no request.body já existe
function checkIfAlreadyExistsUsername(request, response, next) {
  const { username } = request.body;

  const user = users.find((user) => user.username === username);

  if(user){
    return response.status(400).json({error: "Username already exists!"});
  }

  request.user = user;
  return next();
}

//Verifica se o todo com id passado no request.params existe
//Coloca o id e o todo na requisição
function checksExistsUserTodo(request, response, next){
  const { id } = request.params;

  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if(!todo){
    return response.status(404).json({error: "Todo id not found!"});
  }

  request.id = id;
  request.todo = todo;

  return next();
}


// Cria um novo user com body na requisição
app.post('/users', checkIfAlreadyExistsUsername, (request, response) => {
  const { name, username } = request.body;

  const user = {
    id: uuidv4(),
    name: name,
    username: username,
    todos: []
  }

  users.push(user);

  return response.status(201).json(user);
});

//Retorna todos os todos do user
app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

//Cria um todo para o usuário
app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});


//Faz alteração do título e data limite do todo, com id passado pelo request.params
app.put('/todos/:id', checksExistsUserAccount, checksExistsUserTodo, (request, response) => {
  const { todo } = request;

  const { title, deadline } = request.body;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);

});

//Marca um todo como feito
app.patch('/todos/:id/done', checksExistsUserAccount, checksExistsUserTodo, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.status(200).json(todo);
});


//Apaga um todo
app.delete('/todos/:id', checksExistsUserAccount, checksExistsUserTodo, (request, response) => {
  const { user, id } = request;

  //Filter retorna um array com todos os elementos que passaram no  teste.
  //Ou seja, aqueles cujo id é diferente do id que vamos remover
  //E atualizamos o array de todos do usuário
  user.todos = user.todos.filter((todo)=> todo.id != id);

  return response.status(204).send();
});

module.exports = app;