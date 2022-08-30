const express = require('express');
const app = express();
require('dotenv').config()
var cors = require('cors')

/* file system -> trabalhando com arquivos */
const fs = require('fs')
/********* Caminho de pasta Path */
const path = require('path');



const Categories = require('./models/Categories');
const Products = require('./models/Products');
const Users = require('./models/User');

const router = require('./routes/index');

// caminho para a pasta de upload -> isso deixa o caminho consultável no navegador
app.use('/files', express.static(path.resolve(__dirname, "public", "upload")))


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
  app.use(cors());
  next();
})

app.get("/", function(request,response){
  response.send("Serviço API Rest iniciada...");
  console.log(response)
})

app.use(router);



app.listen(process.env.PORT, ()=>{
  console.log(`Servidor iniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});