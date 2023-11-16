import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { calculateTotalPrice } = useContext(ProductContext);
  const checkboxRefs = {};

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
            ref={(ref) => {
              checkboxRefs[option.value] = ref;
            }}
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
