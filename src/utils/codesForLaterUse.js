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


const newProduct = new products({
  productName: "Apple iPhone 13",
  category: "Electronics",
  unitCost: 999,
  quantity: 10,
  transportCost: 50,
  totalCost: 10490,
  purchaseDate: new Date(),
  deliveryDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  sellerName: "Apple Inc.",
  sellerAddress: "1 Apple Park Way, Cupertino, CA 95014, United States",
  paymentMethod: "Credit Card",
  paymentDate: new Date(),
  paymentInstallment: [
    {
      howMany: 2,
      amount: 5245,
      secondInstallmentDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
      secondAmount: 5245,
      paymentCompletionDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
    },
  ],
  Other_Info: "This product comes with a 1-year warranty.",
});

newProduct.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Product added successfully!");
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/products", async (req, res) => {
  const newProducts = new products({ ...req.body });
  const insertedProduct = await newProducts.save();
  return res.status(200).json(insertedProduct);
});


// PAYMENT METHOD

import React, { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const {
    selectedProducts,
    calculateTotalPrice,
    selectedOptions,
    setSelectedOptions,
    amounts,
    setAmounts,
  } = useContext(ProductContext);

  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerNumber: "",
  });

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const options = [
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];



  const handleOptionChange = (value) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.findIndex(
      (option) => option.value === value
    );

    if (index !== -1) {
      newSelectedOptions.splice(index, 1);
      const newAmounts = { ...amounts };
      delete newAmounts[value];
      setAmounts(newAmounts);
    } else {
      const selectedOption = {
        value,
        amounts: { [value]: totalPayment },
        totalPayment: totalPayment,
      };
      newSelectedOptions.push(selectedOption);
    }
    console.log("Updated selectedOptions:", newSelectedOptions, amounts);

    setSelectedOptions(newSelectedOptions);
  };

  const optionsRender = () => {
    return (
      <div>
        {options.map((option) => {
          const selectedOption = selectedOptions[option.value];

          const isChecked = !!selectedOption;
          const paymentInput = isChecked ? (
            <input
              id="checkedOptionValue"
              type="number"
              name="checkedOptionValue"
              placeholder={`Enter amount paid by ${option.label}`}
              value={amounts[option.value] || ""}
              onChange={""}
            />
          ) : null;
          return (
            <div key={option.value}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOptionChange(option.value)}
                value={option.value}
              />
              <label>{option.label} </label>
              {paymentInput}
              {isChecked && (
                <span>
                  (Paid:
                  {amounts[option.value] || 0})
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const paymentComparison = () => {
    const remainingAmount = calculateTotalPrice() - totalPayment;
    if (totalPayment === calculateTotalPrice()) {
      return "Total payment matches required amount.";
    } else if (totalPayment > calculateTotalPrice()) {
      return `Total payment is more than required amount. Remaining amount: ${remainingAmount.toFixed(
        2
      )}`;
    } else {
      return `Total payment is less than required amount. Remaining amount: ${remainingAmount.toFixed(
        2
      )}`;
    }
  };
  const totalPayment = Object.values(amounts).reduce(
    (acc, amount) => acc + parseFloat(amount) || 0,
    0
  );

  const handleSubmission = () => {
    // Gather the data to send to the backend
    const dataToSend = {
      selectedProducts,
      selectedOptions,
      customerDetails,
    };
    console.log(dataToSend);
  };

  return (
    <div>
      <h1>Payment Information</h1>
      <p>
        <em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b>
      </p>
      <p>
        <em>Total paid:</em> <b>{totalPayment.toFixed(2)}</b>
      </p>
      <label>Select Payment Method</label> {optionsRender()}
      <p>{paymentComparison()}</p>
      <br />
      <fieldset>
        <legend>Customer Details</legend>
        <section>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerDetails.customerName}
            onChange={handleCustomerDetailsChange}
            placeholder="Customer Name"
          />
        </section>
        <section>
          <input
            placeholder="Customer Number"
            type="number"
            id="customerNumber"
            name="customerNumber"
            value={customerDetails.customerNumber}
            onChange={handleCustomerDetailsChange}
          />
        </section>
      </fieldset>
      <br />
      <button onClick={handleSubmission}>Submit</button>
    </div>
  );
};


