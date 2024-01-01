const mongoose = require("mongoose");

const debtSalesSchema = new mongoose.Schema({
  selectedProducts: [
    {
      id: String,
      productName: String,
      price: Number,
      quantity: Number,
      subtotal: Number, 
    },
  ],
  customerDetails: {
    customerNumber: Number,
    customerName: String,
  },
  cashPayment: Number,
  bankPayment: Number,
  bankName: String,
  posPayment: Number,
  totalAmount: Number,
  balance: Number,
  installments: Number,
  dates: [Date],
  installmentAmounts: [Number],
  reason: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DebtSale", debtSalesSchema);
