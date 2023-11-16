import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const {calculateTotalPrice} = useContext(ProductContext);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    const newSelectedOption = [...selectedOptions, { selectedOption }];
    setSelectedOptions(newSelectedOption);

    setInputValues({
      ...inputValues,
      [selectedOption]: "",
    });
  };

  const handleInputChange = (e, selectedOption) => {
    const value = e.target.value;

    setInputValues({
      ...inputValues,
      [selectedOption]: value,
    });
  };

  
  return (
    <div>
      <h1>Payment Information</h1>
      <p><em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b></p>
      <label>Select Payment Method</label>{" "}
      <select multiple onChange={handleOptionChange}>
        <option>Cash...</option>
        <option>Bank Transfer...</option>
        <option>POS...</option>
      </select>
      <div>
        {selectedOptions.map((option) => (
          <div key={option}>
            <label>{option}:</label>
            <input
              type="text"
              value={inputValues[option] || ""}
              onChange={(e) => handleInputChange(e, option)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
