// const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const { CreateOrder, SendTestMail } = require('../dataAccessLayer/order-controller');

//get all departments
router.post('/submitOrder', CreateOrder);
router.get('/sendTestMail', SendTestMail);

module.exports = router;