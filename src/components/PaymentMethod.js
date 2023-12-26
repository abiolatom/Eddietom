import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "./ProductContext";

const PaymentMethod = () => {
  // const isInitialRender = useRef(true);
  const {
    selectedProducts,
    calculateTotalPrice,
    selectedOptions,
    setSelectedOptions,
    amounts,
    setAmounts,
  } = useContext(ProductContext);
  const [salesData, setSalesData] = useState({});

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
      <div className="mt-2">
        {options.map((option) => {
          const selectedOption = selectedOptions.find(
            (selectedOption) => selectedOption.value === option.value
          );
          const isChecked = !!selectedOption;
          const paymentInput = isChecked ? (
            <input
              id="checkedOptionValue"
              type="number"
              name="checkedOptionValue"
              placeholder={`Enter amount paid by ${option.label}`}
              value={amounts[option.value] || ""}
              onChange={(e) => handleAmountChange(e, option.value)}
              className="w-full p-2 border rounded-md mt-1"
            />
          ) : null;
          return (
            <div key={option.value} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOptionChange(option.value)}
                value={option.value}
                className="mr-2"
              />
              <label className="mr-3">{option.label} </label>
              {paymentInput}
              {isChecked && (
                <span className="text-gray-600">
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

  const handleSubmission = async (e) => {
    e.preventDefault();
    // Gather the data to send to the backend

    const newSaleData = {
      selectedProducts,
      customerDetails: { ...customerDetails },
      amounts: { ...amounts },
      totalPayment,
    };

    setSalesData(newSaleData);

    console.log(newSaleData);

    try {
      const response = await fetch("http://localhost:3001/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Raw Response:", response);
      const data = await response.json();
      console.log("Sales Data added successfully:", data);
    } catch (error) {
      console.error("Error adding Sales Data:", error);
    }
  };

  /*  useEffect(() => {
    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    console.log(selectedProducts);
  }, [selectedProducts]); */

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
      <p className="mb-2">
        <em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b>
      </p>
      <p className="mb-2">
        <em>Total paid:</em> <b>{totalPayment.toFixed(2)}</b>
      </p>
      <label className="block text-sm font-semibold mb-2">
        Select Payment Method
      </label>{" "}
      {optionsRender()}
      <p className="mb-2">{paymentComparison()}</p>
      <br />
      <fieldset className="border p-4 mb-4">
        <legend className="text-lg font-semibold">Customer Details</legend>
        <div className="mb-2">
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerDetails.customerName}
            onChange={handleCustomerDetailsChange}
            placeholder="Customer Name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <input
            placeholder="Customer Number"
            className="w-full p-2 border rounded-md"
            type="number"
            id="customerNumber"
            name="customerNumber"
            value={customerDetails.customerNumber}
            onChange={handleCustomerDetailsChange}
          />
        </div>
      </fieldset>
      <br />
      <button
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={handleSubmission}
      >
        Submit Sales Details
      </button>
    </div>
  );
};

export default PaymentMethod;
