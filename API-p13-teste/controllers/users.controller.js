const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.create =  async(req, res) =>{
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);



  await Users.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Usuário não encontrado... ${err}`
    })
  })
}
/********************************************************************************* */

exports.findAll = async(req,res)=>{
  await Users.findAll({
    attributes: ['id','name','email','gender', 'password'],
    order: [['id', 'ASC']]

  })
  .then((users) => {
    return res.json({
      erro: false,
      users
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum usuário encontrado!!!`
    })
  })
}
/**************************************************************************** */
exports.update = async(req,res)=>{
  const {id} = req.body;

  await Users.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Usuário alterado com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Usuário não encontrado ...${err}`
    })
  })
}
/******************************************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const users = await Users.findByPk(id);
    if(!users){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum usuário encontrado!"
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
}
/************************************************************* */
exports.delete =  async(req,res)=>{
  const {id} = req.params;
  await Users.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Usuário apadado com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Usuário não apagado...`
    })
  })
}
/************************************************************************************ */
exports.login =  async (req, res) => {
  const user = await Users.findOne({
      attributes: ['id', 'name', 'email', 'gender', 'password'],
      where: {
          email: req.body.email
      }
  })
  if(user === null){
      return res.status(400).json({
          erro: true,
          mensagem:"Erro: Email ou senha incorreta!!!"
      })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))){
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Email ou senha incorreta!!!"
      })
  }
  var token = jwt.sign({id: user.id}, process.env.SECRET,{
    expiresIn: 600 // 1min, '7d' 7dias
  })
  return res.json({
    erro:false,
    mensagem: "Login realizado com sucesso!!!",
    token
    
  })
  



  // return res.json({
  //     erro:false,
  //     mensagem: "Login realizado com sucesso!!!",
  //     name: user.name,
  //     email: user.email,
  //     gender: user.gender
  // })
}
/********************************************************************** */
exports.changepass =  async (req, res) => {
  const {id, password } = req.body;
  var senhaCrypt = await bcrypt.hash(password, 8);
  const users = await Users.findByPk(id);
  if(!users){
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum usuário encontrado!"
    })
  }

  await Users.update({password: senhaCrypt }, {where: {id: id}})
  .then(() => {
      // console.log(res.json());
      return res.json({
          erro: false,
          mensagem: "Senha editada com sucesso!"
      }); 
  }).catch( (err) => {
      return res.status(400).json({
          erro: true,
          mensagem: `Erro: ${err}... A senha não foi alterada!!!`
      })
  })
}

exports.validaToken =  async (req, res) => {
  await Users.findByPk(key, {
      attributes: ['id', 'name', 'email']
  }).then((user)=>{
      return res.status(200).json({
          erro: false,
          user
      })
  }).catch(() => {
      return res.status(400).json({
          erro: true,
    
          mensagem: "Erro: Necessário ralizar o login"
  })

})
}