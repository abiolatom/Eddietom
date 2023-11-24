const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Product_Name: { type: String, required: true },
  Unit_Cost: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Transport_Cost: { type: Number, required: true },
  Total_Cost: { type: Number, required: true },
  Purchase_Date: { type: Date, required: true },
  Delivery_Date: { type: Date, required: true },
  Seller_Name: { type: String, required: true },
  Seller_Address: { type: String, required: true },
  Payment_Method: { type: String, required: true },
  Payment_Date: { type: Number, required: true },
  Payment_Installment: { type: Number },
  Second_Installment_Date: { type: Date },
  Payment_Completion_Date: { type: Date },
  Other_Info: { type: String },
});

const Products = mongoose.model("User", productSchema);

module.exports = {
  Products: Products,
};
