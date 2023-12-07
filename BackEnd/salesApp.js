const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
const { Sales } = require("./Models/SalesSchema");
const salesApp = express();

salesApp.use(cors());
salesApp.use(express.json());

// Set CORS headers
salesApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
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
    let products = [];
    await db

      .collection("products")
      .find()
      .sort({ productName: 1 })
      .forEach((product) => products.push(product));

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

salesApp.get("/sales/:id", async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);
  return res.status(200).json(product);
});

app.post("/products", async (req, res) => {
  const newProduct = new products({ ...req.body });
  if (typeof newProduct === "object") {
    // If newProducts is an object, proceed with saving the product
    const insertedProduct = await db
      .collection("products")
      .insertOne(newProduct);
    return res.status(200).json(insertedProduct);
  } else {
    // Handle the error case when newProducts is not an object
    console.error("newProduct is not a valid MongoDB collection object");
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await products.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await products.findById(id);
  return res.status(200).json(deletedProduct);
});
