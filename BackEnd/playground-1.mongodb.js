/* global use, db */

// Select the database to use.
use("test");

// Insert a few documents into the sales collection.

db.Products.findOne({ Product_Name: "Kings" });
