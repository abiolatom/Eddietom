const express = require("express");
const router = express.Router();
const Expense = require("../Models/ExpensesSchema"); 

module.exports = () => {
  router.get("/", async (req, res) => {
    try {
      const expenses = await Expense.find().sort({ expenseItem: 1 });
      res.status(200).json(expenses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Expenses" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findById(id);
      return res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const newExpense = { ...req.body };
    try {
      const insertedExpense = await Expense.create(newExpense);
      return res.status(200).json(insertedExpense);
    } catch (error) {
      console.error("Error inserting new expense:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      return res.status(200).json(updatedExpense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      if (!deletedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      return res
        .status(200)
        .json({ message: "Expense deleted successfully", deletedExpense });
    } catch (error) {
      console.error('Error deleting expense:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
