const Sequelize = require('sequelize');

const sequelize = new Sequelize("senac","root","Sen@c123",{
  host: "localhost",
  dialect: 'mysql'
});

sequelize.authenticate().then( function(){
  console.log('Conecção com o banco de dados relaizada com sucesso!');
}).catch(function(err){
  console.log(`Erro conecção : ${err}`);
});

module.exports = sequelize;