const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  selectedProducts: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  amounts: [
    {
      value: { type: String, required: true },
      amounts: { type: Number, required: true },
    },
  ],

  totalPayment: { type: Number, required: false },
  customerDetails: {
    customerName: { type: String, required: false },
    customerNumber: { type: Number, required: false },
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;
