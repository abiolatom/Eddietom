const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  customerDetails: {
    customerName: { type: String, required: false },
    customerNumber: { type: Number, required: false },
  },

  selectedProducts: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  selectedOptions: [
    {
      value: { type: String, required: true },
      amounts: { type: Number, required: true },
      totalPayment: { type: Number, required: false },
    },
  ],

  totalPayment: { type: Number, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;
