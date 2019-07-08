
    
const express = require('express');
const router = express.Router();
const departmentDao = require('../dataAccessLayer/departmentDao');

//get all departments
router.get('/getDepartments', function (request, response, next) {
    try {
        let query = `SELECT 
                        A.department_id AS 'DepartmentId',
                        A.name AS 'Name',
                        A.description AS 'Description' 
                    FROM department A 
                    ORDER BY department_id ASC`; // query database to get all the departments

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