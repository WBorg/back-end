const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports ={
  validaToken : async function (req, res, next){
  const authHeader =  req.headers.authorization;
  if(!authHeader){
     return res.status(400).json({
         erro: true,
         menssagem: "Erro: necessário realizar login"
     })
  };
  const [bearer , token] = authHeader.split(" ");
  if(!token){
     return res.status(400).json({
         erro: true,
         mensagem: "Erro: Necessário realizar login"
  
  })
 }
 try{
      const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
      req.userId = decoded.id;
      return next();
  }catch(err){
     if(err){
         
         return res.status(400).json({
             erro: true,
             menssagem: `Erro: ${err}`
      })
     }else{

         return res.status(401).json({
             erro: true,
             menssagem: "Erro: Necessário realizar login!"
      })
     }
 
 }
}
}