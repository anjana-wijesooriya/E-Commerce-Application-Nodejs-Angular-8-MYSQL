
    
const express = require('express');
const router = express.Router();
const { 
    GetProducts,
    GetProductAttributes,
    GetFilteredProducts,
    GetProductDetailsById
 } = require('../dataAccessLayer/product-controller');

//get all Product
router.get('/getProducts', GetProducts);

// Get product related attributes
router.get('/getProductAttributes', GetProductAttributes)

//get all Filtered Products
router.post('/getFilteredProducts', GetFilteredProducts);

// get product details by product id
router.get('/getProductDetails', GetProductDetailsById)


module.exports = router;