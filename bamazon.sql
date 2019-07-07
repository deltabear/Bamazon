DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL auto_increment,
product_name VARCHAR(50),
department_name VARCHAR(50),
price NUMERIC(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Final Fantasy VII", "Games/Electronics", 25.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lab Goggles", "Industrial", 5.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation 2", "Games/Electronics", 117.64, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dust Mask", "Industrial", 12.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hard Hat", "Industrial", 23.11, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SKULLCANDY Headphones", "Games/Electronics", 39.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("RAZER Headphones", "Games/Electronics", 80.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ONIKUMA  Headphones", "Games/Electronics", 24.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Safety Vest", "Industrial", 7.87, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Welding Gloves", "Industrial", 12.74, 4);
