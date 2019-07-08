
    
const express = require('express');
const router = express.Router();
const departmentDao = require('../dataAccessLayer/departmentDao');

//get all Shipping Regions
router.get('/getShippingRegions', function (request, response, next) {
    try {
        let query = `SELECT 
                        A.shipping_region_id AS 'RegionId',
                        A.shipping_region AS 'Region'
                    FROM shipping_region A 
                    ORDER BY shipping_region_id ASC`; // query database to get all the  Shipping Regions

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ error: error.message });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
});

module.exports = router;