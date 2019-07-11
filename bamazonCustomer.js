// require dotenv package for security
require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: keys.mysqlAuth.host,
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: keys.mysqlAuth.user,
  
    // Your password
    password: keys.mysqlAuth.password,
    database: "bamazon"
  })

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  })
  
function start() {
//when opened, display all items for sale including id, names, prices
// form query that displays from PRODUCTS table in bamazon database
connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  console.log('Bamazon Storefront')
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }


// then PROMPT user 2 questions, sequentially
    //1 The first should ask them the ID of the product they would like to buy.
    //2 The second message should ask how many units of the product they would like to buy.
inquirer
  .prompt([
      {
        name: "purchaseID",
        type: "input",
        message: "What product (ID only) would you like to buy?",
        // error handling in case customer types id number outside of list values
        validate: function(value){
          if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
            return true;
          } else{
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How many do you wish to purchase?",
        //error handling again, will be changed to fit project directions
        validate: function(value){
          if(isNaN(value)){
            return false;
          } else{
            return true;
          }
        }
      }
   ]).then(function(){
   }
  )})}
// customer places order, application CHECKS IF store has enough stock to meet customer's request
    // ELSE, command line responds "Product stock cannot meet customer demands. Transaction cancelled"
    // order is prevented from going through
// Store has enough stock:
  // update SQL database to reflect quantity
  // transaction goes through, shows customer total cost of their purchase