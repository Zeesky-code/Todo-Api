const fs = require('fs');
const path = require('path')
//getting todo from mock database

const todoPath = path.join(__dirname, '../db', 'db.json');
let todos = JSON.parse(fs.readFileSync(todoPath));

//updating database

function updateDB(){
    fs.writeFileSync(todoPath, JSON.stringify(todos)), (err) => {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end(JSON.stringify({
                message: 'Internal Server Error. Could not save todo to database.'
            }));
        }
    };
}
//getting all todos
async function getTodos(req,res){
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos
    });

}

//getting todos by ID
async function getTodoByID(req, res) {
    const id = req.params.id
    const todo = todos.find((todo) => {
        return todo.id == id
    })

    if (!todo) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found'
        })
    }
    res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo
    });

}

//adding a new Todo
async function addTodo(req,res){
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
    updateDB()
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todos
    })
}

//updating a todo

async function updateTodo(req,res){
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
    updateDB()
    return res.status(201).send({
        success: 'true',
        message: 'todo updated successfully',
        updatedTodo
    })
}
//deleting a todo

async function deleteTodo(req,res){
    const id = req.params.id
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    })

    if (todoIndex === -1) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found'
        })
    }

    todos.splice(todoIndex, 1)
    updateDB()
    return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfully'
    })
}
module.exports = {
    getTodos,
    getTodoByID,
    addTodo,
    deleteTodo,
    updateTodo
}