import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { calculateTotalPrice } = useContext(ProductContext);
  const [amounts, setAmounts] = useState({});

  const options = [
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];

  const handleAmountChange = (event, value) => {
    const newAmount = { ...amounts };
    newAmount[value] = event.target.value;

    if (
      !selectedOptions.some((option) => option.value === value) &&
      (!event.target.value || parseFloat(event.target.value) === 0)
    ) {
      delete newAmount[value];
    }
    setAmounts(newAmount);
  };

  const handleOptionChange = (value) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.findIndex(
      (option) => option.value === value
    );

    if (index !== -1) {
      newSelectedOptions.splice(index, 1);
    } else {
      const selectedOption = { value, amounts: 0 };
      newSelectedOptions.push(selectedOption);
    }
    console.log("Updated selectedOptions:", newSelectedOptions, amounts);

    setSelectedOptions(newSelectedOptions);
  };

  const optionsRender = () => {
    return (
      <div>
        {options.map((option) => {
          const selectedOption = selectedOptions.find(
            (selectedOption) => selectedOption.value === option.value
          );
          const isChecked = !!selectedOption;
          const paymentInput = isChecked ? (
            <input
              type="number"
              placeholder={`Enter amount paid by ${option.label}`}
              value={amounts[option.value] || ""}
              onChange={(e) => handleAmountChange(e, option.value)}
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
    if (totalPayment === calculateTotalPrice()) {
      return "Total payment matches required amount.";
    } else if (totalPayment > calculateTotalPrice()) {
      return "Total payment is more than required amount.";
    } else {
      return "Total payment is less than required amount.";
    }
  };
  const totalPayment = Object.values(amounts).reduce(
    (acc, amount) => acc + parseFloat(amount) || 0,
    0
  );

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
    </div>
  );
};

export default PaymentMethod;
