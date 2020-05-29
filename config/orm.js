// Import MySQL connection and export ORM object to handle all database functions
const connection = require('../config/connection.js');

// Helper function for SQL syntax
// The  helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string "?,?,?" based on the incoming MySQL query
const printQuestionMarks = num => {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = ob => {
  let arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Blue Cheese Cheeseburger => 'Blue Cheese Cheeseburger')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Blue Cheese Cheeseburger'} => ["name='Blue Cheese Cheeseburger'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  all: (tableInput, cb) => {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      // Returns db result in callback
      cb(result);
    });
  },
  create: (table, cols, vals, cb) => {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log("Insert query: ", queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {burger_name: panther, devoured: true}
  update: (table, objColVals, condition, cb) => {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log("UPDATE query: ", queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: (table, condition, cb) => {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger_model.js).
module.exports = orm;
