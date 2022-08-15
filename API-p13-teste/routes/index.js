const router = require('express').Router();


const { validaToken } = require('../middlewares/auth')

//Rota de Categories 
const categoriesRoutes = require('./categories.routes');
router.use('/categories', categoriesRoutes);

// Rota dos produtos
const productsRoutes = require('./products.routes');
router.use('/products', productsRoutes);

// Rota dos usuários
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

// //Rota de validacao de token
const user = require('../controllers/users.controller')
router.get('/validaToken',validaToken, user.validaToken )



module.exports = router ;

