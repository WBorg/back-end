const express = require('express');
const app = express();
require('dotenv').config()
const Categories = require('./models/Categories');
const User = require('./models/User');
const Products = require('./models/Products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(request,response){
  response.send("Serviço API Rest iniciada...");
})
/***************************************************************************************** */
app.post('/categorie', async(req, res) =>{
  var dados = req.body;


  await Categories.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Categoria inserida com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Categoria não encontrada... ${err}`
    })
  })
})
/************************************************************************** */
app.get("/categories", async(req,res)=>{
  await Categories.findAll({
    attributes: ['id','name','description'],
    order: [['name', 'ASC']]

  })
  .then((categories) => {
    return res.json({
      erro: false,
      categories
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhuma categoria encontrada!!!`
    })
  })
})
/****************************************************************************** */
app.put("/categorie", async(req,res)=>{
  const {id} = req.body;

  await Categories.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Categoria alterada com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Categoria não encontrada ...${err}`
    })
  })
})
/******************************************************************* */
app.get('/categories/:id', async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const categories = await Categories.findByPk(id);
    if(!categories){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhuma categoria encontrada!"
      })
    }
    res.status(200).json({
      erro: false,
      categories
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
})
/******************************************************************* */


app.delete("/categorie/:id", async(req,res)=>{
  const {id} = req.params;
  await Categories.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Categoriea apagada com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Categoria não apagado...`
    })
  })
})


/****************************************************************** */
app.listen(process.env.PORT, ()=>{
  console.log(`Servidor iniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});