const express = require('express');
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');


// Export routes for server.js to use.
module.exports = router;
