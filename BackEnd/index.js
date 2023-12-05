const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const Router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", Router);
const Products = require("./Schema");

const MONGO_URI =
  process.env.DATABASE_URL ||
  "mongodb+srv://oladimejiabiolatom:S02KewC4FFC8HdKz@cluster0.7v7ipbc.mongodb.net/";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

Router.get("/", async (req, res) => {
  const products = await Products.find();
  res.json(products);
}); 

Router.post("/", async (req, res) => {
  try {
    const newProducts = new Products({
      Product_Name: req.body.productName,
      Unit_Cost: req.body.unitCost,
      Quantity: req.body.quantity,
      Transport_Cost: req.body.transportCost,
      Total_Cost: req.body.totalCost,
      Purchase_Date: req.body.purchaseDate,
      Delivery_Date: req.body.deliveryDate,
      Seller_Name: req.body.sellerName,
      Seller_Address: req.body.sellerAddress,
      Payment_Method: req.body.paymentMethod,
      Payment_Date: req.body.paymentDate,
      Payment_Installment: req.body.paymentInstallment,
      Second_Installment_Date: req.body.secondInstallment,
      Payment_Completion_Date: req.body.paymentCompletionDate,
      Other_Info: req.body.otherInfo,
    });
    await newProducts.save();
    res.json(newProducts);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log(`Server listening on port ${PORT}`);
});
