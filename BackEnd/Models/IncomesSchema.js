const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  incomeSource: {
    type: String,
    required: true,
  },
  amounts: {
    type: Object,
    required: true,
  },
  reason: {
    type: String,
    required: false,
  },
  totalPayment: {
    type: Number,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
