const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      let sales = [];
      await db

        .collection("sales")
        .find()
        .sort({ SaleName: 1 })
        .forEach((sale) => sales.push(sale));

      res.status(200).json(sales);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Sales" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const sale = await db.collection("sales").findById(id);
    return res.status(200).json(sale);
  });

  router.post("/", async (req, res) => {
    const newSale = { ...req.body };
    if (typeof newSale === "object") {
      const insertedSale = await db
        .collection("sales")
        .insertOne(newSale);
      return res.status(200).json(insertedSale);
    } else {
      console.error("newSale is not a valid MongoDB collection object");
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedSale = await db
        .collection("sales")
        .findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
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
    const deletedSale = await db.collection("sales").findById(id);
    return res.status(200).json(deletedSale);
  });

  return router;
};
