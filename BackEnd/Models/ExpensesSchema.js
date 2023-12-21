const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseItem: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: false },
    datetime: { type: Date, required: true },
  },
  { timestamps: true }
);

expenseSchema.virtual("total").get(function () {
  return this.amount; // Example of a virtual field
});

// Add a pre-save hook for logging
expenseSchema.pre("save", async function (next) {
  console.log("Saving expense:", this); // Logging in pre-save hook
  next();
});

const expenses = mongoose.model("expenses", expenseSchema);

module.exports = { expenses };
