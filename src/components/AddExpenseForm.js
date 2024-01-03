// components/ExpenseForm.js
import React, { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";

const ExpenseForm = () => {
  const {
    totalPayment,
    amounts,
    paymentOptions,
    optionsRender,
    selectedOptions,
  } = useContext(ProductContext);

  const [expenseFormData, setExpenseFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(amounts).length === 0) {
      window.alert("Please enter payment amounts.");
      return;
    }

    const amountsNotEmpty =
      amounts.cashPayment !== "" ||
      amounts.bankPayment !== "" ||
      amounts.posPayment !== "";

    if (!amountsNotEmpty) {
      window.alert("Please enter expense amounts.");
      return;
    }

    console.log(amounts);
    const bankPaymentOption = paymentOptions.find(
      (option) => option.paymentOption === "bankPayment"
    );

    if (
      selectedOptions.some(
        (o) => o.value === bankPaymentOption.paymentOption
      ) &&
      !amounts[bankPaymentOption.paymentOption]?.bankName
    ) {
      window.alert("Please select a bank for bank transfer.");
      return;
    }

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const amountsForBackend = {};
    for (const option of paymentOptions) {
      const amount = amounts[option.paymentOption];
      if (amount) {
        amountsForBackend[option.paymentOption] = parseFloat(amount.amount);

        if (option.paymentOption === "bankPayment") {
          amountsForBackend.bankName = amounts.bankPayment.bankName;
        }
      }
    }

    const newExpense = {
      expenseItem: expenseFormData.expenseItem,
      expenseAmount: amountsForBackend,
      reason: expenseFormData.reason,
      totalPayment,
      timestamp: formattedDateTime,
    };

    fetch("http://localhost:3001/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="expenseItem"
            className="block text-gray-700 font-bold"
          >
            Expense Item
          </label>
          <input
            type="text"
            name="expenseItem"
            placeholder="What are you spending on?"
            id="expenseItem"
            className="w-full border p-2 rounded-md"
            value={expenseFormData.expenseItem}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">{optionsRender()}</div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-bold">
            Reason
          </label>
          <textarea
            id="reason"
            className="w-full border p-2 rounded-md"
            value={expenseFormData.reason}
            onChange={handleChange}
            name="reason"
            placeholder="What is the reason for this Expenses?"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
