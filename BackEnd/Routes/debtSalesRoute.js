const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      let debtsales = [];
      await db

        .collection("debtsales")
        .find()
        .sort({ Timestamp: 1 })
        .forEach((sale) => debtsales.push(sale));

      res.status(200).json(debtsales);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Sales" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const sale = await db
      .collection("debtsales")
      .findOne({ _id: new ObjectId(id) });
    return res.status(200).json(sale);
  });

  router.post("/", async (req, res) => {
    const newSale = { ...req.body };
    if (typeof newSale === "object") {
      const insertedSale = await db.collection("debtsales").insertOne(newSale);
      return res.status(200).json(insertedSale);
    } else {
      console.error("newSale is not a valid MongoDB collection object");
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedSale = await db
        .collection("debtsales")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: req.body }, { new: true });
      if (!updatedSale) {
        return res.status(404).json({ error: "sale not found" });
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
      // Find the sale by ID before deleting
      const deletedSale = await db.collection("debtsales").findOne({ _id: new ObjectId(id) });
  
      if (!deletedSale) {
        return res.status(404).json({ error: "Sale not found" });
      }
  
      // Perform the delete operation
      const result = await db.collection("debtsales").deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        // The sale was successfully deleted
        return res.status(200).json({ message: "Sale deleted successfully", deletedSale });
      } else {
        // If deletedCount is not 1, the delete operation didn't succeed
        return res.status(500).json({ error: "Error deleting sale" });
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
