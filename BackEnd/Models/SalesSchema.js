const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    selectedProducts: [
      {
        id: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],
    paymentMethod: [
      {
        method: {
          type: String,
          enum: ["cashPayment", "bankPayment", "posPayment"],
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        bankName: {
          type: String,
          required: function () {
            return this.method === "bankPayment";
          },
        },
      },
    ],

    totalPayment: { type: Number, required: false },
    customerDetails: {
      customerName: { type: String, required: false },
      customerNumber: { type: Number, required: false },
    },

    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", saleSchema);

module.exports = Sales;
