const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  customerDetails: {
    customerName: { type: String, required: false },
    customerNumber: { type: Number, required: false },
  },

  selectedProducts: [
    {
      id: { type: String, required: false },
      name: { type: String, required: false },
      price: { type: Number, required: false },
      quantity: { type: Number, required: false },
      subtotal: { type: Number, required: false },
    },
  ],
  selectedOptions: [
    {
      value: { type: String, required: false },
      amounts: { type: Number, required: false },
      totalPayment: { type: Number, required: false },
    },
  ],

  totalPayment: { type: Number, required: false },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;