/* global use, db */

// Select the database to use.
use("mongodbVSCodePlaygroundDB");

// Insert a few documents into the sales collection.
db.getCollection("Products").insertMany([
  {
    Product_Name: "Alhamsad",
    Category: "Rice",
    Unit_Cost: 30000,
    Quantity: 20,
    Transport_Cost: 200,
    Total_Cost: 600200,
    Purchase_Date: new Date("2014-03-01T08:00:00Z"),
    Delivery_Date: new Date("2014-03-01T08:00:00Z"),
    Seller_Name: "YKT",
    Seller_Address: "Ijomu",
    Payment_Method: "Cash",
    Payment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Installment: 1,
    Second_Installment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Completion_Date: new Date("2014-03-01T08:00:00Z"),
    Other_Info: null,
  },
  {
    Product_Name: "Famous",
    Unit_Cost: 30000,
    Quantity: 20,
    Transport_Cost: 200,
    Total_Cost: 600200,
    Purchase_Date: new Date("2014-03-01T08:00:00Z"),
    Delivery_Date: new Date("2014-03-01T08:00:00Z"),
    Seller_Name: "YKT",
    Seller_Address: "Ijomu",
    Payment_Method: "Cash",
    Payment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Installment: 1,
    Second_Installment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Completion_Date: new Date("2014-03-01T08:00:00Z"),
    Other_Info: null,
  },
  {
    Product_Name: "Alhamsad",
    Unit_Cost: 30000,
    Quantity: 20,
    Transport_Cost: 200,
    Total_Cost: 600200,
    Purchase_Date: new Date("2014-03-01T08:00:00Z"),
    Delivery_Date: new Date("2014-03-01T08:00:00Z"),
    Seller_Name: "YKT",
    Seller_Address: "Ijomu",
    Payment_Method: "Cash",
    Payment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Installment: 1,
    Second_Installment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Completion_Date: new Date("2014-03-01T08:00:00Z"),
    Other_Info: null,
  },
  {
    Product_Name: "Alhamsad",
    Unit_Cost: 30000,
    Quantity: 20,
    Transport_Cost: 200,
    Total_Cost: 600200,
    Purchase_Date: new Date("2014-03-01T08:00:00Z"),
    Delivery_Date: new Date("2014-03-01T08:00:00Z"),
    Seller_Name: "YKT",
    Seller_Address: "Ijomu",
    Payment_Method: "Cash",
    Payment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Installment: 1,
    Second_Installment_Date: new Date("2014-03-01T08:00:00Z"),
    Payment_Completion_Date: new Date("2014-03-01T08:00:00Z"),
    Other_Info: null,
  },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db
  .getCollection("sales")
  .find({
    date: { $gte: new Date("2014-04-04"), $lt: new Date("2014-04-05") },
  })
  .count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection("sales").aggregate([
  // Find all of the sales that occurred in 2014.
  {
    $match: {
      date: { $gte: new Date("2014-01-01"), $lt: new Date("2015-01-01") },
    },
  },
  // Group the total sales for each product.
  {
    $group: {
      _id: "$item",
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
]);
