import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { calculateTotalPrice } = useContext(ProductContext);
  const options = [
    { value: "cash", label: "cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];

  const handleOptionChange = (value) => {
    const isSelected = selectedOptions.some((option) => option === value);
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.value !== value)
      );
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });
  };

  const optionsRender = () => {
    return options.map((option) => {
      const isChecked = selectedOptions.includes(option.value);
      return (
        <div key={option.value}>
          <input
            type="checkbox"
            checked={isChecked || false}
            onChange={() => handleOptionChange(option.value)}
            value={option.value}
          />
          <label>{option.label} </label>
          {isChecked && (
            <input
              type="text"
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
