
    
const express = require('express');
const router = express.Router();
const { GetCategories } = require('../dataAccessLayer/category-controller');

//get all departments
router.get('/getCategories', GetCategories);

module.exports = router;