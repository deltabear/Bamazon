var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "secret",
    database: "bamazon"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
function start() {
//when opened, display all items for sale including id, names, prices
    inquirer
    .prompt([
        /* Pass your questions in here */
    ])
    .then(answers => {
        // Use user feedback for... whatever!!
    });

// then PROMPT user 2 questions, sequentially
    //1 The first should ask them the ID of the product they would like to buy.
    //2 The second message should ask how many units of the product they would like to buy.
// customer places order, application CHECKS IF store has enough stock to meet customer's request
    // ELSE, command line responds "Product stock cannot meet customer demands. Transaction cancelled"
    // order is prevented from going through
// Store has enough stock:
  // update SQL database to reflect quantity
  // transaction goes through, shows customer total cost of their purchase