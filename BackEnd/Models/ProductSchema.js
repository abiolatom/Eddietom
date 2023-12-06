const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    unitCost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    transportCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    sellerName: { type: String, required: true },
    sellerAddress: { type: String, required: true },
    paymentMethod: { type: String, required: false },
    paymentDate: { type: Date, required: false },
    paymentInstallment: [
      {
        howMany: { type: Number, required: false },
        amount: { type: Number, required: false },
        secondInstallmentDate: { type: Date, required: false },
        secondAmount: { type: Number, required: false },
        paymentCompletionDate: { type: Date, required: false },
      },
    ],
    otherInfo: { type: String, required: false },
  },
  { timestamps: true }
);

const products = mongoose.model("products", productSchema);
module.exports = products;
