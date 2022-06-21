const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const port = 4500;
const User = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(request,response){
  response.send("Serviço API Rest iniciada...");
})

app.get("/users", async(req,res)=>{
  await User.findAll({
    attributes: ['id','name','email','gender'],
    order: [['name', 'ASC']]

  })
  .then((users) => {
    return res.json({
      erro: false,
      users
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou Nenhum Usuário encontrado!!!`
    })
  })
})
/***************************************************************************** */
app.get('/users/:id', async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const users = await User.findByPk(id);
    if(!users){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum Usuário encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      users
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
})

/*************************************************************************** */
app.post('/user', async(req, res) =>{
  // const {name, email, gender, password} = req.body 
  var dados = req.body;
  console.log(dados);
  dados.password = await bcrypt.hash(dados.password, 8);
  console.log(dados.password);


  await User.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Usuário não cadstrado... ${err}`
    })
  })
})
/************************************************************** */
app.put("/user", async(req,res)=>{
  const {id} = req.body;

  await User.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Usuário alterado com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Usuário não alterado ...${err}`
    })
  })
})

app.delete("/user/:id", async(req,res)=>{
  const {id} = req.params;
  await User.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Usuário apagado com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Usuário não apagado...`
    })
  })
})

app.get("/login", async(req, res)=>{
  const user = await User.findOne({  
    attrinutes: ['id', 'name', 'email','gender'],
    where:{
      email: req.body.email
    }
  })
  if(user === null){
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Usuário ou senha incorreta!"
    })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))){
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Email ou senha incorreta!"
    })
  }
  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!!!"
  })
})

app.listen(port, ()=>{
  console.log(`Servidor iniciado na porta ${port} http://localhost:${port}`);
});



