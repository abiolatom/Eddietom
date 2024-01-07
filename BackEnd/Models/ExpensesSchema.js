const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseItem: { type: String, required: true },
    expenseAmount: { Object: true, required: true },
    totalExpenses: { type: Number, required: true },
    reason: { type: String, required: false },
    
  },
  { timestamps: true }
);


expenseSchema.virtual("total").get(function () {
  return this.amount;
});

expenseSchema.pre("save", async function (next) {
  console.log("Saving expense:", this); 
  next();
});

const expenses = mongoose.model("expenses", expenseSchema);

module.exports = { expenses };
