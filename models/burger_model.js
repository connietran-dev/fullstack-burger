const orm = require('../config/orm.js');

// Code that will call the ORM functions using burger specific input for the ORM.

const burger = {
    all: function (cb) {
        // SELECT * FROM burgers
        orm.all("burgers", function (res) {
            // Returns RowDataPacket array results from burgers table to router
            console.log("All db results from burgers: ", res);
            cb(res);
        });
    }
    // INSERT INTO burgers VALUES ?
    // UPDATE burgers SET columns WHERE condition
    // DELETE FROM burgers WHERE condition
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;