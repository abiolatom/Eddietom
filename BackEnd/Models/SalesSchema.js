const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  customerDetails: [
    {
      customerName: String,
      customerNumber: Number,
    },
  ],

  selectedProducts: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number,
    },
  ],
  amounts: [
    {
      method: String,
      amount: Number,
    },
  ],
  totalPayment: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;
