const http = require('http'); 
const port = 3500;

const server = http.createServer((req,res) => {
  res.end("Página inicial do Server Nodejs");
});

server.listen(port, ()=>{
  console.log(`Servidor iniciado na porta ${port}:http://localhost:${port}`)
});