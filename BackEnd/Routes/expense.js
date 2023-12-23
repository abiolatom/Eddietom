const express = require('express');
const router = express.Router();
const { expenses } = require("../Models/ExpensesSchema");

router.get("/expenses", async (req, res) => {
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
  
  router.get("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const expense = await expenses.findById(id);
    return res.status(200).json(expense);
  });
  
  router.post("/expenses", async (req, res) => {
    const newExpense = new expenses({ ...req.body }); 
  
    try {
      const savedExpense = await newExpense.save(); 
      res.status(200).json(savedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create expense" });
    }
  });
  