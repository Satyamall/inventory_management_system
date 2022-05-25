
const express = require("express");
const app = express();
const cors = require("cors");

const connect = require("./config/db.config");

const productRouter = require("./router/product.router");

app.use(cors());
app.use(express.json());

app.use("/products",productRouter);

const start = async ()=>{
    try{
           await connect();
           app.listen(5000,()=>{
               console.log("App listening on port 5000");
           })
    }
    catch(err){
        console.log(err)
    }
}

start();