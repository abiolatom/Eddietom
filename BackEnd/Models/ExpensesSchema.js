const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseItem: { type: String, required: true },
    expenseAmount: { type: Object, required: true },
    totalExpenses: { type: Number, required: true },
    reason: { type: String, required: false },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
