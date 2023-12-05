//PAYMENT METHOD CODES

import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { calculateTotalPrice } = useContext(ProductContext);

  const options = [
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];

  const handleOptionChange = (value) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option.value !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
  };

  const optionsRender = () => {
    return options.map((option) => {
      const isChecked = selectedOptions.includes(option.value);
      return (
        <div key={option.value}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleOptionChange(option.value)}
            value={option.value}
          />
          <label>{option.label} </label>
          {isChecked && (
            <input
              type="number"
              placeholder={`Enter amount paid by ${option.label}`}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Payment Information</h1>
      <p>
        <em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b>
      </p>
      <label>Select Payment Method</label> {optionsRender()}
      <p>Payment Options: {selectedOptions.join(", ")} </p>
    </div>
  );
};

export default PaymentMethod;


mongoose
.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB", error));

Router.get("/", async (req, res) => {
const products = await Products.find();
res.json(products);
});
}

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
