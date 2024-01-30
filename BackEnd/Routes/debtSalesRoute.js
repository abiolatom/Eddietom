const express = require("express");
const router = express.Router();
const DebtSale = require("../Models/DebtSalesSchema"); // Adjust the path based on your file structure

module.exports = () => {
  router.get("/", async (req, res) => {
    try {
      const debtsales = await DebtSale.find().sort({ Timestamp: 1 });
      res.status(200).json(debtsales);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Sales" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const sale = await DebtSale.findById(id);
      return res.status(200).json(sale);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const newSale = { ...req.body };
    try {
      const insertedSale = await DebtSale.create(newSale);
      return res.status(200).json(insertedSale);
    } catch (error) {
      console.error("Error inserting new sale:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedSale = await DebtSale.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedSale) {
        return res.status(404).json({ error: "Sale not found" });
      }
      return res.status(200).json(updatedSale);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedSale = await DebtSale.findByIdAndDelete(id);
      if (!deletedSale) {
        return res.status(404).json({ error: "Sale not found" });
      }
      return res
        .status(200)
        .json({ message: "Sale deleted successfully", deletedSale });
    } catch (error) {
      console.error('Error deleting sale:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
