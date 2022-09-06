const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const port = 8000;
const hostname = 'localhost';

app.get('/', (req,res)=>{
    res.send("Welcome to the home page")
})

app.listen(port, hostname,()=>{
    console.log(`Server is running at ${port}`)
});
