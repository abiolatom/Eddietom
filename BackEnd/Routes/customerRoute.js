const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      let customers = [];
      await db

        .collection("customers")
        .find()
        .sort({ Timestamp: 1 })
        .forEach((customer) => customers.push(customer));

      res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Customers" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const customer = await db
      .collection("customers")
      .findOne({ _id: new ObjectId(id) });
    return res.status(200).json(customer);
  });

  router.post("/", async (req, res) => {
    const newCustomer = { ...req.body };
    if (typeof newCustomer === "object") {
      const insertedCustomer = await db.collection("customers").insertOne(newCustomer);
      return res.status(200).json(insertedCustomer);
    } else {
      console.error("newCustomer is not a valid MongoDB collection object");
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCustomer = await db
        .collection("customers")
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: req.body },
          { new: true }
        );
      if (!updatedCustomer) {
        return res.status(404).json({ error: "customer not found" });
      }

      return res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deletedCustomer = await db
        .collection("customers")
        .findOne({ _id: new ObjectId(id) });

      if (!deletedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const result = await db
        .collection("customers")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        return res
          .status(200)
          .json({ message: "Customer deleted successfully", deletedCustomer });
      } else {
        return res.status(500).json({ error: "Error deleting customer" });
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
