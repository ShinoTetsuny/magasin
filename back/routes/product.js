const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/search', productController.searchProducts);

module.exports = router;