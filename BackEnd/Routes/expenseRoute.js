const { ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
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

  router.get("/:id", async (req, res) => {
    const { id } = req.params.id;
    const expense = await db.collection("expenses").findOne({ _id: ObjectId(id) });
    return res.status(200).json(expense);
  });

  router.post("/", async (req, res) => {
    const newExpense = { ...req.body };
    if (typeof newExpense === "object") {
      const insertedExpenses = await db
        .collection("expenses")
        .insertOne(newExpense);
      return res.status(200).json(insertedExpenses);
    } else {
      console.error("newProduct is not a valid MongoDB collection object");
    }
  });

  
  router.put("/:id", async (req, res) => {
    try {
      const expenseId = req.params.id;
      const updatedExpense = req.body; 
      const result = await db
        .collection("expenses")
        .updateOne({ _id: expenseId }, { $set: updatedExpense });

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Expense updated successfully" });
      } else {
        res.status(404).json({ error: "Expense not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not update the expense" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const expenseId = req.params.id;
      const result = await db
        .collection("expenses")
        .deleteOne({ _id: expenseId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Expense deleted successfully" });
      } else {
        res.status(404).json({ error: "Expense not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not delete the expense" });
    }
  });

  return router;
};
