const express = require("express");
const router = express.Router();
const Income = require("../Models/IncomesSchema");

module.exports = () => {
  router.get("/", async (req, res) => {
    try {
      const incomes = await Income.find().sort({ incomeSource: 1 });
      res.status(200).json(incomes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Incomes" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const income = await Income.findById(id);
      return res.status(200).json(income);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const newIncome = { ...req.body };
    try {
      const insertedIncome = await Income.create(newIncome);
      return res.status(200).json(insertedIncome);
    } catch (error) {
      console.error("Error inserting new income:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedIncome = await Income.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedIncome) {
        return res.status(404).json({ error: "Income not found" });
      }
      return res.status(200).json(updatedIncome);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedIncome = await Income.findByIdAndDelete(id);
      if (!deletedIncome) {
        return res.status(404).json({ error: "Income not found" });
      }
      return res
        .status(200)
        .json({ message: "Income deleted successfully", deletedIncome });
    } catch (error) {
      console.error("Error deleting income:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
