const Products = require('../models/Products');

exports.create =  async(req, res) =>{
  var dados = req.body;


  await Products.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Produto inserido com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Produto não encontrado... ${err}`
    })
  })
}
/********************************************************************************* */

exports.findAll = async(req,res)=>{
  await Products.findAll({
    attributes: ['id','name','description','price', 'categorieId'],
    order: [['id', 'ASC']]

  })
  .then((products) => {
    return res.json({
      erro: false,
      products
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum produto encontrado!!!`
    })
  })
}
/**************************************************************************** */
exports.update = async(req,res)=>{
  const {id} = req.body;

  await Products.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Produto alterado com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Produto não encontrado ...${err}`
    })
  })
}
/******************************************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const products = await Products.findByPk(id);
    if(!products){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum produto encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      products
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
}
/************************************************************* */
exports.delete =  async(req,res)=>{
  const {id} = req.params;
  await Products.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Produto apadado com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Produto não apagado...`
    })
  })
}