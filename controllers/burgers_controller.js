const express = require("express");

// Create the router for the app
const router = express.Router();

// Import the model (burger_model.js) to use its database functions
const burger = require("../models/burger_model.js");

// Create routes and set up logic within those routes where required.
router.get("/", function (req, res) {

  // Call method from burger_model.js
  burger.all(function (data) {
    // Use the database results array from the burgers table using the index.handlebars file
    res.render("index", { burgers: data });

  });
});

router.post("/api/burgers", function (req, res) {
  console.log("New burger POST request: ", req.body);
  // Column names
  burger.create(["burger_name", "devoured"],
    // Properties from object in POST
    [req.body.burger_name, req.body.devoured], function (result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
  console.log("Incoming UPDATE request: ", req.body);

  let condition = "id = " + req.params.id;
  console.log("UPDATE burger WHERE condition: ", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
