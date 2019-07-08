
    
const express = require('express');
const router = express.Router();
const departmentDao = require('../dataAccessLayer/departmentDao');

//get all Shipping Regions
router.post('/addNewCustomer', function (request, response, next) {
    try {
        let params = request.body;
        let query = `INSERT INTO tshirtshop.customer
        (address_1, address_2, city, country, credit_card, day_phone, email, eve_phone, mob_phone, name, password, postal_code, region, shipping_region_id)
        values
        (
            '${params.AddressOne}', 
            '${params.AddressTwo}', 
            '${params.City}', 
            '${params.Country}', 
            '${params.CreditCard}', 
            '', 
            '${params.Email}', 
            '', 
            '${params.Mobile}', 
            '${params.FirstName}', 
            '${params.Password}', 
            '${params.ZipCode}', 
            '',
            ${params.RegionId});`; // query database to get all the  Shipping Regions

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ error: err.sql });

           return response.json(true);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
});

module.exports = router;