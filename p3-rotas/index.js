//https://expressjs.com/en/starter/hello-world.html

const express = require('express'); //
const app = express();
const port = 4500; //8080 porta padrao da web


app.get("/", function(request, response) {
  response.send("Página inicial do serviço");
});

app.get("/sobre-empresa", (req,res) => {
  res.send("Pagina sobre empresa App");
});

app.get("/contato", (req, res)=>{
  res.send("Pagina contato do App");
});







app.listen(port, ()=> {
  console.log(`Servidor iniciado na porta ${port}`);
})