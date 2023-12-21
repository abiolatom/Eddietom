const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
const { products } = require("./Models/ProductSchema");
const { expenses } = require("./Models/ExpensesSchema");
const app = express();

app.use(express.json());
app.use(cors());

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
  const newProduct = new products({ ...req.body });
  if (typeof newProduct === "object") {
    const insertedProduct = await db
      .collection("products")
      .insertOne(newProduct);
    return res.status(200).json(insertedProduct);
  } else {
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


app.get("/expenses", async (req, res) => {
  try {
    let expenses = [];
    await db

      .collection("expenses")
      .find()
      .sort({ expenseItem: 1 })
      .forEach((expense) => expenses.push(expense));

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch Expenses" });
  }
});

app.get("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const expense = await expenses.findById(id);
  return res.status(200).json(expense);
});

app.post("/expenses", async (req, res) => {
  const newExpense = new expenses({ ...req.body }); 

  try {
    const savedExpense = await newExpense.save(); 
    res.status(200).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
});
