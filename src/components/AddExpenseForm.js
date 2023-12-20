// components/ExpenseForm.js
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = ({ addExpense }) => {
  const [expenseItem, setExpenseItem] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new expense object with a unique ID, current date, and time
    const newExpense = {
      id: uuidv4(),
      expenseItem,
      amount,
      reason,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Pass the new expense to the parent component
    addExpense(newExpense);

    // Clear the form fields
    setExpenseItem("");
    setAmount("");
    setReason("");
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
            value={expenseItem}
            onChange={(e) => setExpenseItem(e.target.value)}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            name="reason"
            placeholder="What is the reason for this Expenses?"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
