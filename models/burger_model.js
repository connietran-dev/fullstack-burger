const orm = require('../config/orm.js');

// Code that will call the ORM functions using burger specific input for the ORM.
const burger = {
    all: function (cb) {
        // SELECT * FROM burgers
        // Returns RowDataPacket array results from burgers table to router
        orm.all("burgers", res => cb(res));
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
        // INSERT INTO burgers VALUES ?
        orm.create("burgers", cols, vals, res => cb(res));
    },
    // UPDATE burgers SET columns WHERE condition
    update: function (objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, res => cb(res));
    },
    // DELETE FROM burgers WHERE condition
    delete: function (condition, cb) {
        orm.delete("burgers", condition, res => cb(res));
    }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;