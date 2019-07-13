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
    showStock();
  });
  
var showStock = function() {
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
   shopping();
  });
};

var shopping = function() {
// then PROMPT user 2 questions, sequentially
  inquirer.prompt({
  //1 The first should ask them the ID of the product they would like to buy.
    name: "purchaseID",
    type: "input",
    message: "What product (ID only) would you like to buy?"
  }).then(function(answer1) {
      var selection = answer1.purchaseID;
      connection.query("SELECT * FROM Products WHERE item_id=?", selection, function(err, res){
       if (err) throw err;
       if (res.length === 0) {
         console.log("Product ID does not exist: please enter valid ID number listed above.");

   shopping();
     } else {
      inquirer.prompt({
        name: "qty",
        type: "input",
        message: "How many do you wish to purchase?",
    // customer places order, application CHECKS IF store has enough stock to meet customer's request
      }).then(function(answer2){
        var quantity = answer2.qty;
        if (quantity > res[0].stock_quantity) {
          console.log("Apologies, we only have " + res[0].stock_quantity + " items of the Product selected.")

        } else {
        console.log("");
        console.log(res[0].product_name + " ready to purchase.");
        console.log("Your order will be " + quantity + " " + res[0].product_name + " at " + res[0].price);

        var newQuantity = res[0].stock_quantity - quantity;
        connection.query(
          "UPDATE products SET stock_quantity = " + newQuantity +" WHERE item_id= " + res[0].item_id, function(err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your Order has been Processed");
                      console.log("Thank you for Shopping with us...!");
                      console.log("");
                      connection.end();
          }
        );
      }
      })
    }
  })
})
}
    // customer places order, application CHECKS IF store has enough stock to meet customer's request

    // ELSE, command line responds "Product stock cannot meet customer demands. Transaction cancelled"
    // order is prevented from going through
// Store has enough stock:
  // update SQL database to reflect quantity
  // transaction goes through, shows customer total cost of their purchase