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

  const handleAmountChange = (event, value) => {
    const newAmount = { ...amounts };
    newAmount[value] = event.target.value;

    if (
      selectedOptions.some((option) => option.value === value) &&
      event.target.value &&
      parseFloat(event.target.value) > 0
    ) {
      const newSelectedOptions = [...selectedOptions];
      const index = newSelectedOptions.findIndex(
        (option) => option.value === value
      );

      if (index !== -1) {
        newSelectedOptions[index].amounts = parseFloat(event.target.value);
        setSelectedOptions(newSelectedOptions);
      }
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
      const newAmounts = { ...amounts };
      delete newAmounts[value];

      setAmounts(newAmounts);
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
      amounts,
      totalPayment,
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

export default PaymentMethod;
