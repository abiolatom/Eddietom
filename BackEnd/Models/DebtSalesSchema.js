const mongoose = require("mongoose");

const debtSalesSchema = new mongoose.Schema({
  selectedProducts: [
    {
      id: String,
      productName: String,
      price: Number,
      quantity: Number,
      subtotal: Number, // Assuming this is calculated
    },
  ],
  customerDetails: {
    customerNumber: Number,
    // Add other customer details as needed
  },
  cashPayment: Number,
  bankPayment: Number,
  bankName: String,
  posPayment: Number,
  totalAmount: Number,
  balance: Number,
  installments: Number,
  dates: [Date], // Assuming this stores installment dates
  installmentAmounts: [Number], // Assuming this stores installment amounts
  reason: String,
  timestamp: {
    type: Date,
    default: Date.now, // Set default to current time
  },
});

module.exports = mongoose.model("DebtSale", debtSalesSchema);
