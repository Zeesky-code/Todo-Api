//Setting up the express app
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

//importing the database
const todos =  [
    {
      id: 1,
      title: "lunch",
      description: "Go for lunch by 2pm"
    }
];

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req,res)=>{
    res.send("Welcome to the todo api")
})

//getting all todos
app.get('/api/v1/todos',(req,res)=>{
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos
    });

})


//getting one todo

app.get('/api/v1/todos/:id',(req,res)=>{
    const id = req.params.id
    const index = todos.findIndex(todo => todo.id == id)

    if (index == -1){
        return res.status(404).send({
        success: 'false',
        message: 'todo not found'
        })
    }
    res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo: todos[index]
    });

})


//creating a todo

app.post('/api/v1/todos',(req,res)=>{
    if (!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }
    const todo={
        id: todos.length +1,
        title: req.body.title,
        description: req.body.description
    }

    todos.push(todo)
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todos
    })
})

//updating a todo
app.put('/api/v1/todos/:id', (req,res)=>{
    const id = req.params.id
    const index = todos.findIndex(todo => todo.id == id)

    if (index == -1){
        return res.status(404).send({
        success: 'false',
        message: 'todo not found'
        })
    }
    if (!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        })
    } else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        })
    }

    const updatedTodo = {
        id: id,
        title: req.body.title,
        description: req.body.description
    }

    //replacing the todo with the original
    todos.splice(index, 1, updatedTodo)
    return res.status(201).send({
        success: 'true',
        message: 'todo updated successfully',
        updatedTodo
    })
})

//deleting a todo
app.delete('/api/v1/todos/:id',(req,res)=>{
    const id = req.params.id
    const index = todos.findIndex(todo => todo.id == id)
    if (index == -1) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found'
        })
    }
    todos.splice(index, 1)
    return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfully'
    })
})

module.exports = app;

