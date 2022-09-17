const express = require('express');
const todoController = require('../controllers/todoController');


const todoRouter = express.Router();

todoRouter.get('/api/v1/todos', todoController.getTodos);
todoRouter.get('/api/v1/todo/:id', todoController.getTodoByID);
todoRouter.post('/api/v1/todos', todoController.addTodo);
todoRouter.put('/api/v1/todo/:id', todoController.updateTodo);
todoRouter.delete('/api/v1/todo/:id', todoController.deleteTodo);

module.exports = todoRouter;