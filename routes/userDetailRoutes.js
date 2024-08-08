const express = require('express');
const router = express.Router();
const userDetailController = require('../controllers/userDetailController');

// POST endpoint to create user details
router.post('/createUserDetail', userDetailController.createUserDetail);

module.exports = router;
