import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

const DebtSales = () => {
  const navigate = useNavigate();

  const { selectedProducts, calculateTotalPrice } = useContext(ProductContext);
  const [installmentAmounts, setInstallmentAmounts] = useState(
    Array.from({ length: 3 }, () => 0)
  );
  const [reason, setReason] = useState("");
  const [cashPayment, setCashPayment] = useState("");
  const [bankPayment, setBankPayment] = useState("");
  const [bankName, setBankName] = useState("");
  const [posPayment, setPosPayment] = useState("");
  const [installments, setInstallments] = useState(1);
  const [dates, setDates] = useState([]);

  const totalAmount =
    Number(posPayment) + Number(bankPayment) + Number(cashPayment);

  const balance = calculateTotalPrice() - totalAmount;

  function handleBankPaymentChange(event) {
    setBankPayment(event.target.value);
  }

  function handleBankNameChange(event) {
    setBankName(event.target.value);
  }

  function handlePosPaymentChange(event) {
    setPosPayment(event.target.value);
  }

  function handleInstallmentsChange(event) {
    setInstallments(event.target.value);
  }

  function handleDateChange(index, event) {
    const newDates = [...dates];
    newDates[index] = event.target.value;
    setDates(newDates);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", {
      cashPayment,
      bankPayment,
      bankName,
      posPayment,

      installments,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2>Debt Sales Form</h2>
      <button
        className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Modify Products
      </button>
      {selectedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-md overflow-hidden bg-white m-2"
            >
              <div className="p-2">
                <strong>{product.productName}</strong>
                <p className="mt-2">Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p className="mb-2">SubTotal: {product.subtotal}</p>
              </div>
            </div>
          ))}
          <div className="border rounded-md overflow-hidden bg-white col-span-3 m-2">
            <div className="p-4">
              <strong>Total Price: </strong>
              <span>{Number(calculateTotalPrice())}</span>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cash Payment:</label>
          <input
            type="number"
            value={cashPayment}
            onChange={(e) => setCashPayment(e.target.value)}
          />
        </div>
        <div>
          <label>Bank Payment:</label>
          <input
            type="number"
            value={bankPayment}
            onChange={handleBankPaymentChange}
          />
          {bankPayment > 0 && (
            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={handleBankNameChange}
            />
          )}
        </div>
        <div>
          <label>POS Payment:</label>
          <input
            type="number"
            value={posPayment}
            onChange={handlePosPaymentChange}
          />
        </div>
        <div>
          <label>Total Amount:</label>
          <input type="number" value={totalAmount} readOnly />
        </div>
        <div>
          <label>Balance:</label>
          <input type="number" value={balance} readOnly />
        </div>
        <div>
          <label>Installments:</label>
          <select value={installments} onChange={handleInstallmentsChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        {Array.from({ length: installments }).map((_, index) => (
          <div key={index}>
            <label>Date for Installment {index + 1}:</label>
            <input
              type="date"
              value={dates[index] || ""}
              required
              onChange={(e) => handleDateChange(index, e)}
            />
            {installments > 1 && (
              <>
                <label>Amount for Installment {index + 1}:</label>
                <input
                  type="number"
                  value={installmentAmounts[index]}
                  onChange={(e) => {
                    const newAmounts = [...installmentAmounts];
                    newAmounts[index] = e.target.value;
                    setInstallmentAmounts(newAmounts);
                  }}
                />
              </>
            )}
          </div>
        ))}
        <div>
          <label>Reason:</label>
          <textarea
            value={reason}
            placeholder="State Reason for Debt Sales"
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DebtSales;
