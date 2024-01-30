const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const Products = require("../Models/ProductSchema");

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const products = await Products.find().sort({ productName: 1 });

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch products" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const newProduct = { ...req.body };
    try {
      const insertedProduct = await Products.create(newProduct);

      return res.status(200).json(insertedProduct);
    } catch (error) {
      console.error("Error inserting new product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProduct = await Products.findByIdAndUpdate(
        id,
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

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Products.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res
        .status(200)
        .json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error("Error deleting Product:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};

/*
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
      const deletedProduct = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const result = await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        return res
          .status(200)
          .json({ message: "Product deleted successfully", deletedProduct });
      } else {
        return res.status(500).json({ error: "Error deleting Product" });
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
*/
