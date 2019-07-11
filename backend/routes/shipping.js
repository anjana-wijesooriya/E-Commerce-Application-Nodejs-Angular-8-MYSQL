
    
const express = require('express');
const router = express.Router();
const { GetShippingRegions } = require('../dataAccessLayer/shipping-controller');

//get all Shipping Regions
router.get('/getShippingRegions', GetShippingRegions);

module.exports = router;