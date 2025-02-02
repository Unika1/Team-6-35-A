const express = require("express")
const {connection} = require("./config/db")
const app = express();

connection()

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})