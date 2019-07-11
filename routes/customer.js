
    
const express = require('express');
const router = express.Router();
const {
    AuthenticateLogin,
    RegisterCustomer,
    Logout
} = require('../dataAccessLayer/customer-controller');

//register new user
router.post('/addNewCustomer', RegisterCustomer);

//get username and password
router.post('/authenticateLogin', AuthenticateLogin);

// Logout from the system
router.get('/logout', Logout)

module.exports = router;