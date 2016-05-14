// Import `connection.js` into `orm.js`

var connection = require('../config/connection.js');

//create the code that will execute MySQL commands
var orm = {
    all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    //vals is an array of values that we want to save to cols
    //cols are the columns we want to insert the values into
    create: function(table, cols, vals, cb) {
      var queryString = 'INSERT INTO ' + table;

      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES ( ? );';

      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    //objColVals would be the columns and values that you want to update
    //an example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
     if(objColVals.devoured == 'true'){
        objColVals = 1
      }else{
        objColVals = 0
      }
      var queryString = 'UPDATE ' + table;

      queryString = queryString + ' SET ';
      queryString = queryString + 'devoured = '+ objColVals;
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;


      console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    
};

// Export the orm
module.exports = orm;
