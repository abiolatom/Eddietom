const {ObjectId} = require("mongodb")
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
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

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await db.collection("products").findById(id);
    return res.status(200).json(product);
  });

  router.post("/", async (req, res) => {
    const newProduct = { ...req.body };
    if (typeof newProduct === "object") {
      const insertedProduct = await db
        .collection("products")
        .insertOne(newProduct);
      return res.status(200).json(insertedProduct);
    } else {
      console.error("newProduct is not a valid MongoDB collection object");
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProduct = await db
        .collection("products")
        .findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the sale by ID before deleting
      const deletedProduct = await db.collection("products").findOne({ _id: new ObjectId(id) });
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Perform the delete operation
      const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        // The sale was successfully deleted
        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
      } else {
        // If deletedCount is not 1, the delete operation didn't succeed
        return res.status(500).json({ error: "Error deleting Product" });
      }
    } catch (error) {
      console.error('Error deleting Product:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
