// components/ExpenseForm.js
import React, { useState } from "react";

const ExpenseForm = () => {
  const [expenseFormData, setExpenseFormData] = useState({
    expenseItem: "",
    amount: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new expense object with a unique ID, current date, and time
    const newExpense = {
      ...expenseFormData,
      datetime: new Date(),
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

    // Clear the form fields
    setExpenseFormData({
      expenseItem: "",
      amount: "",
      reason: "",
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
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-bold">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full border p-2 rounded-md"
            //className="w-full border p-2 rounded-md appearance-none focus:outline-none focus:border-blue-500"
            value={expenseFormData.amount}
            onChange={handleChange}
            required
            placeholder="Amount?"
          />
        </div>
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
