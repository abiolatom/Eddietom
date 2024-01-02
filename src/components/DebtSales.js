import { ProductContext } from "./ProductContext";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DebtSales = () => {
  const [debtSalesData, setDebtSalesData] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    selectedProducts,
    totalPayment,
    selectedOptions,
    optionsRender,
    calculateTotalPrice,
    customerDetails,
    resetForm,
    amounts,
    paymentOptions,
    handleCustomerDetailsChange,
  } = useContext(ProductContext);
  const [installmentAmounts, setInstallmentAmounts] = useState(
    Array.from({ length: 3 }, () => 0)
  );
  const [reason, setReason] = useState("");
  const [installments, setInstallments] = useState(1);
  const [dates, setDates] = useState([]);

  const totalAmount =
    totalPayment +
    installmentAmounts.reduce((sum, amount) => sum + Number(amount), 0);

  const balance = calculateTotalPrice() - totalAmount;

  function handleInstallmentsChange(event) {
    setInstallments(event.target.value);
  }
  const handleDateChange = (index, event) => {
    const newDates = [...dates];
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    if (selectedDate >= today) {
      newDates[index] = event.target.value;
      setDates(newDates);
    } else {
      alert("Please select a date after today.");
    }
  };

  useEffect(() => {
    if (submissionSuccess) {
      window.alert("Debt Sales data submitted successfully!");
      resetForm();
      navigate("/");
    }
  }, [debtSalesData, submissionSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (installments > 1 && balance !== 0) {
      alert("Please indicate how full payment is made.");
      return;
    }
    if (!customerDetails.customerName || !customerDetails.customerNumber) {
      alert("Please fill in customer details.");
      return;
    }
    if (installments === 1 && (!dates[0] || dates[0] === "")) {
      alert("Please select a date for the installment.");
      return;
    }

    // Add validation for bankPayment
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
    const selectedProductsData = selectedProducts.map((product) => ({
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    }));
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

    const newDebtSaleData = {
      selectedProducts: selectedProductsData,
      customerDetails: {
        ...customerDetails,
        customerNumber: parseFloat(customerDetails.customerNumber),
      },
      paymentMethod: {
        amounts: amountsForBackend,
        totalAmount: parseFloat(totalAmount),
        balance,
        installments: parseFloat(installments),
        dates,
        installmentAmounts: parseFloat(installmentAmounts),
      },

      reason,
      timestamp: formattedDateTime,
    };
    try {
      const response = await fetch("http://localhost:3001/debtsales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDebtSaleData),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
      }
    } catch (error) {
      console.error("Error during data submission:", error.message);
    }
    console.log("Amounts for Backend:", amountsForBackend);
    setDebtSalesData(newDebtSaleData);
    console.log(debtSalesData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold mb-4">Debt Sales Form</h2>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Modify Products
        </button>
      </div>
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
      <fieldset className="mt-4">{optionsRender()}</fieldset>

      <form className="mt-4" onSubmit={handleSubmit}>
        <fieldset className="mt-4">
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Paid Amount:
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="number"
              value={totalAmount}
              readOnly
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Amount to Balance:
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="number"
              value={balance}
              readOnly
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600 mr-2">
              Installments:
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={installments}
              onChange={handleInstallmentsChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {Array.from({ length: installments }).map((_, index) => (
            <div className="flex flex-col mb-4" key={index}>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-600">
                  Payment Date for {index + 1} Installment :
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={dates[index] || ""}
                  required
                  onChange={(e) => handleDateChange(index, e)}
                />
              </div>
              {installments > 1 && (
                <div className="flex items-center mb-4">
                  <label className="block text-sm font-medium text-gray-600 mr-2">
                    Amount for {index + 1} Installment :
                  </label>
                  <input
                    className="w-full p-2 border rounded-md my-2"
                    type="number"
                    value={installmentAmounts[index]}
                    onChange={(e) => {
                      const newAmounts = [...installmentAmounts];
                      newAmounts[index] = e.target.value;
                      setInstallmentAmounts(newAmounts);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600 mr-2">
              Reason:
            </label>
            <textarea
              value={reason}
              className="w-full p-2 border rounded-md"
              placeholder="State Reason for Debt Sales"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

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
                type="tel"
                id="customerNumber"
                name="customerNumber"
                value={customerDetails.customerNumber}
                onChange={handleCustomerDetailsChange}
              />
              {isNaN(customerDetails.customerNumber) && (
                <p className="text-red-500">
                  Please enter a valid numeric value.
                </p>
              )}
            </div>
          </fieldset>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            type="submit"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default DebtSales;
