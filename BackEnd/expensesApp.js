const express = require("express");
require("dotenv").config();
const PORT2 = process.env.PORT2;
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
const { expenses } = require("./Models/ExpensesSchema");
const app = express();

app.use(express.json());
app.use(cors());

//db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(PORT2, () => {
      console.log(`app listening on ${PORT2}`);
      console.log("Connected to database");
    });
  }
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
  const newExpense = new expenses({ ...req.body }); // Use the model to create a new expense

  try {
    const savedExpense = await newExpense.save(); // Use save() to insert, triggering timestamps
    res.status(200).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

/* exApp.post("/expenses", async (req, res) => {
  const newExpense = new expenses({ ...req.body });
  if (typeof newExpense === "object") {
    
    const insertedExpense = await db
      .collection("expenses")
      .insertOne(newExpense);
    return res.status(200).json(insertedExpense);
  } else {
 
    console.error("newProduct is not a valid MongoDB collection object");
  }
});
*/
