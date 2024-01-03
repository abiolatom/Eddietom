import React, { useContext, useState } from "react";
import { ProductContext } from "./ProductContext"; // Assuming context is shared
import { useNavigate } from "react-router-dom";

const AddIncomeForm = () => {
  const { amounts, paymentOptions, totalPayment, optionsRender } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [incomeFormData, setIncomeFormData] = useState({
    incomeSource: "",
    amounts: {},
    notes: "",
  });

  const handleChange = (e) => {
    setIncomeFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(amounts).length === 0) {
      window.alert("Please enter payment amounts.");
      return;
    }
    if (totalPayment === 0) {
      window.alert("Fill in the requisite Income Amount!");
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

    const newIncome = {
      incomeSource: incomeFormData.incomeSource,
      incomeAmount: amountsForBackend,
      notes: incomeFormData.notes,
      totalPayment,
      timestamp: formattedDateTime,
    };

    fetch("http://localhost:3001/incomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIncome),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Income added successfully:", data);
        window.alert("Income added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding income:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="incomeSource"
            className="block text-gray-700 font-bold"
          >
            Income Source
          </label>
          <input
            type="text"
            name="incomeSource"
            placeholder="Where did the income come from?"
            id="incomeSource"
            className="w-full border p-2 rounded-md"
            value={incomeFormData.incomeSource}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">{optionsRender()}</div>
        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700 font-bold">
            Notes
          </label>
          <textarea
            id="notes"
            className="w-full border p-2 rounded-md"
            value={incomeFormData.notes}
            onChange={handleChange}
            name="notes"
            placeholder="Any additional notes about this income?"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;
