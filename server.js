const app = require("./index")

const port = 8000;
const hostname = 'localhost';

app.listen(port, hostname,()=>{
    console.log(`Server is running at ${port}`)
});
