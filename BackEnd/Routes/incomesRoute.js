const { ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      let incomes = [];
      await db
        .collection("incomes")
        .find()
        .sort({ incomeSource: 1 })
        .forEach((income) => incomes.push(income));

      res.status(200).json(incomes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Incomes" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params.id;
    const income = await db.collection("incomes").findOne({ _id: ObjectId(id) });
    return res.status(200).json(income);
  });

  router.post("/", async (req, res) => {
    const newIncome = { ...req.body };
    if (typeof newIncome === "object") {
      const insertedIncomes = await db
        .collection("incomes")
        .insertOne(newIncome);
      return res.status(200).json(insertedIncomes);
    } else {
      console.error("newIncome is not a valid MongoDB collection object");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const incomeId = req.params.id;
      const updatedIncome = req.body; 
      const result = await db
        .collection("incomes")
        .updateOne({ _id: ObjectId(incomeId) }, { $set: updatedIncome });

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Income updated successfully" });
      } else {
        res.status(404).json({ error: "Income not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not update the income" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const incomeId = req.params.id;
      const result = await db
        .collection("incomes")
        .deleteOne({ _id: ObjectId(incomeId) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Income deleted successfully" });
      } else {
        res.status(404).json({ error: "Income not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not delete the income" });
    }
  });

  return router;
};
