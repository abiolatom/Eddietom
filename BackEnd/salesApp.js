const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
const { sales } = require("./Models/SalesSchema");
const salesApp = express();

salesApp.use(express.json());
salesApp.use(cors());



//db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    salesApp.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
      console.log("Connected to database");
    });
  }
});

salesApp.get("/sales", async (req, res) => {
  try {
    let sales = [];
    await db

      .collection("sales")
      .find()
      .sort({ timestamp: 1 })
      .forEach((sale) => sales.push(sale));

    res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

salesApp.get("/sales/:id", async (req, res) => {
  const { id } = req.params;
  const saleItem = await sales.findById(id);
  return res.status(200).json(saleItem);
});

salesApp.post("/products", async (req, res) => {
  const newSale = new sales({ ...req.body });
  if (typeof newSale === "object") {
    const insertedSale = await db
      .collection("products")
      .insertOne(newSale);
    return res.status(200).json(insertedSale);
  } else {
    console.error("new Sales is not a valid MongoDB collection object");
  }
});

