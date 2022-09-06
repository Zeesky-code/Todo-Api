//Setting up the express app
import express from 'express';
const app = express();

//importing the database
import db from "./db/todos.js";


const port = 8000;
const hostname = 'localhost';

app.get('/', (req,res)=>{
    res.send("Welcome to the todo api")
})

app.get('/api/v1/todos',(req,res)=>{
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
})

app.listen(port, hostname,()=>{
    console.log(`Server is running at ${port}`)
});
