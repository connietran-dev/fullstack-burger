const express = require("express");

// Create the router for the app
const router = express.Router();

// Import the model (burger_model.js) to use its database functions
const burger =  require("../models/burger_model.js");

// Create routes and set up logic within those routes where required.
router.get("/", function (req, res) {

  // Call method from burger_model.js
  burger.all(function (data) {
    // Use the database results array from the burgers table using the index.handlebars file
    res.render("index", { burgers: data });

  });
});

// Export routes for server.js to use.
module.exports = router;
