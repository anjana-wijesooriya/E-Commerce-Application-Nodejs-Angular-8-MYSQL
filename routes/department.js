
    
const express = require('express');
const router = express.Router();
const { GetDepartments } = require('../dataAccessLayer/department-controller');

//get all departments
router.get('/getDepartments', GetDepartments);

module.exports = router;