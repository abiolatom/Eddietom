const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    unitCost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    transportCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    purchaseDate: { type: Date, required: false },
    deliveryDate: { type: Date, required: false },
    sellerName: { type: String, required: false },
    sellerAddress: { type: String, required: false },
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
