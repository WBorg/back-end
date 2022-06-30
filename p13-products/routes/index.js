const router = require('express').Router();

//Rota de Categories 
const categoriesRoutes = require('./categories.routes');
router.use('/categories', categoriesRoutes);

// Rota dos produtos
const productsRoutes = require('./products.routes');
router.use('/products', productsRoutes);


module.exports = router;

