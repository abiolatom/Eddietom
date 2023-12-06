const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");

const cors = require("cors");

const { products } = require("./Models/ProductSchema");

const app = express();
app.use(cors());
app.use(express.json());

//db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
      console.log("Connected to database");
    });
  }
});

app.get("/products", async (req, res) => {
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

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);
  return res.status(200).json(product);
});

app.post("/products", async (req, res) => {
  const newProducts = new products({ ...req.body });
  const insertedProduct = await newProducts.save();
  return res.status(200).json(insertedProduct);
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
