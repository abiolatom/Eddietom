import mongoose from "mongoose";
const { schema } = mongoose;

const productSchema = new schema(
  {
    productName: String,
    unitCost: Number,
    quantity: Number,
    transportCost: Number,
    totalCost: Number,
    purchaseDate: Date,
    deliveryDate: Date,
    sellerName: String,
    sellerAddress: String,
    paymentMethod: String,
    paymentDate: String,
    paymentInstallment: [
      {
        howMany: Number,
        amount: Number,
        secondInstallmentDate: Date,
        secondAmount: Number,
        paymentCompletionDate: Date,
      },
    ],
    Other_Info: String,
  },
  { timestamps: true }
);

const products = mongoose.model('products', productSchema);

export default products