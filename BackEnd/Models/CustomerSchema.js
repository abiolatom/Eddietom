const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    customerAddress: {
      type: String,
      required: false,
    },
    customerCity: {
      type: String,
      required: false,
    },
    customerCategory: {
      type: String,
      enum: ["Reseller", "End User", "Both"],
      required: false,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
