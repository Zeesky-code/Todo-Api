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
        todos: todos
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
        id: db.length +1,
        title: req.body.title,
        description: req.body.description
    }

    db.push(todo)
    console.log(db)
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
    })
})


module.exports = app;

