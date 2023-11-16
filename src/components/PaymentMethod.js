import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const { calculateTotalPrice } = useContext(ProductContext);

  const handleOptionChange = (option) => (e) => {
    const isChecked = e.target.checked;

    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        return [...prevSelectedOptions, option];
      } else {
        const updatedOptions = prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
        const { [option]: removedValue, ...remainingValues } = inputValues;
        setInputValues(remainingValues);

        return updatedOptions;
      }
    });
  };

  const handleInputChange = (option) => (e) => {
    const newValue = e.target.value;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [option]: newValue,
    }));
  };

  return (
    <div>
      <h1>Payment Information</h1>
      <p>
        <em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b>
      </p>
      <label>Select Payment Method</label>{" "}
      <select
        multiple={true}
        value={selectedOptions}
        onChange={(e) =>
          setSelectedOptions(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
      >
        <option>Cash...</option>
        <option>Bank Transfer...</option>
        <option>POS...</option>
      </select>
      <div>
        {selectedOptions.map((option) => (
          <div key={option}>
            <label>
              {option}:
              <input
                type="text"
                value={inputValues[option] || ""}
                onChange={handleInputChange(option)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
