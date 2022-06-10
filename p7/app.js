const Sequelize = require('sequelize');

const sequelize = new Sequelize('senac','root','',{
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then( function(){
  console.log('Conecção com o banco de dados relaizada com sucesso!');
}).catch(function(err){
  console.log(`Erro conecção : ${err}`);
});

const User = sequelize.define('users',{
  id: {
    type: Sequelize.INTEGER,  
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING(50),
    allowNull: false

  },
  email:{
    type: Sequelize.STRING,
    allowNull: false

  },
  gender:{
    type: Sequelize.STRING(1),
    allowNull: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  }
})

//Criar a tabela com sequelize
//User.sync();
// Excluir a tabela e criar novamente
//User.sync({force: true})
// verificar se há alguma diferença na tabel, raliza alteração
User.sync({alter:true})
// cadastrar registro no banco de dados
// User.create({
//   name: "Roberta",
//   email: "email@email.br",
//   gender: "F"
// })
