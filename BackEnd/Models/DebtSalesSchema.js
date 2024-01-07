const mongoose = require("mongoose");

const debtSalesSchema = new mongoose.Schema(
  {
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
    amounts: {
      type: Object,
      required: true,
    },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("DebtSale", debtSalesSchema);
