const express = require("express");
const router = express.Router();
const Customer = require("../Models/CustomerSchema"); 
module.exports = () => {
  router.get("/", async (req, res) => {
    try {
      const customers = await Customer.find().sort({ Timestamp: 1 });
      res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch Customers" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findById(id);
      return res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    const newCustomer = { ...req.body };
    try {
      const insertedCustomer = await Customer.create(newCustomer);
      return res.status(200).json(insertedCustomer);
    } catch (error) {
      console.error("Error inserting new customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
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
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res
        .status(200)
        .json({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
      console.error('Error deleting customer:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
