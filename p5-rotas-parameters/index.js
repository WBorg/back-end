

const express = require('express'); //
const app = express();
const port = 3333; //8080 porta padrao da web

app.use(express.json());

const contatos = ['André', 'Willy', 'Samuel','Richard API'];

app.get("/",(req,res)=>{
  res.send("App iniciado !!!");
})


app.get("/contatos", (req,res)=>{
  return res.json(contatos);
})

app.get("/users/:id", (req,res)=>{

  // const id = req.params.id;
  const {id} = req.params; 
  const {sit, vacinado} = req.query



  console.log(id);
  return res.json({
    // id: id,
    id,
    nome: "Theo",
    email: "theo@sp.senac.br",
    sit,
    vacinado,
  })
})

app.post("/contatos", (req,res)=>{

  const {nome} = req.body;
  contatos.push(nome);
  return res.json(contatos);
})

app.delete("/users/:id", (req,res)=>{
  contatos.pop();
  return res.json(contatos);
})









app.listen(port, ()=> {
  console.log(`Servidor iniciado na porta ${port}`);
})