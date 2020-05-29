const express = require("express");

// Create the router for the app
const router = express.Router();

// Import the model (burger_model.js) to use its database functions
const burger = require("../models/burger_model.js");

// Create routes and set up logic within those routes where required.
router.get("/", (req, res) => {

  // Call method from burger_model.js
  burger.all(data => {
    // Use the database results array from the burgers table using the index.handlebars file
    res.render("index", { burgers: data });

  });
});

router.post("/api/burgers", (req, res) => {
  console.log("New burger POST request: ", req.body);
  // Column names
  burger.create(["burger_name", "devoured"],
    // Properties from object in POST
    [req.body.burger_name, req.body.devoured], result => {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
  console.log("Incoming UPDATE request: ", req.body);

  let condition = "id = " + req.params.id;
  console.log("UPDATE burger WHERE condition: ", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, result => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", (req, res) => {
  let condition = "id = " + req.params.id;

  burger.delete(condition, result => {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Redirect to root if no routes match
router.get("*", (req, res) => { res.redirect('/') });

// Export routes for server.js to use.
module.exports = router;
