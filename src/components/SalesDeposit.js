import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { CustomerSearch, CustomerNameAndNumber } from "./CustomerForm";

const SalesDeposit = () => {
  const [depositData, setDepositData] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [balanceQuantities, setBalanceQuantities] = useState({});
  const [pickUpQuantities, setPickUpQuantities] = useState(
    Array.from({ length: 3 }, () => 0)
  );

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
  } = useContext(ProductContext);

  const [installmentAmounts, setInstallmentAmounts] = useState(
    Array.from({ length: 3 }, () => 0)
  );

  const [notes, setNotes] = useState("");
  const [installments, setInstallments] = useState(1);
  const [dates, setDates] = useState([]);

  const calculateBalanceQuantities = () => {
    const quants = {};
    selectedProducts.forEach((product) => {
      quants[product.id] =
        Number(product.quantity) -
        pickUpQuantities.reduce((sum, quantity) => sum + Number(quantity), 0);
    });
    setBalanceQuantities(quants);
  };

    // Recalculate balance quantities when pickUpQuantities change
  const handlePickUpQuantityChange = (index, event) => {
    const newPickUpQuantities = [...pickUpQuantities];
    newPickUpQuantities[index] = Number(event.target.value);
    setPickUpQuantities(newPickUpQuantities);
    calculateBalanceQuantities();
  };
  useEffect(() => {
    calculateBalanceQuantities();
 }, [selectedProducts, pickUpQuantities]);


 

  const handleDateChange = (index, event) => {
    const newDates = [...dates];
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    if (
      selectedDate >= today ||
      selectedDate.toDateString() === today.toDateString()
    ) {
      newDates[index] = event.target.value;
      setDates(newDates);
    } else {
      alert("Please select a date on or after today.");
    }
  };
  function handleInstallmentsChange(event) {
    setInstallments(event.target.value);
  }
  useEffect(() => {
    if (submissionSuccess) {
      window.alert("Sales Deposit data submitted successfully!");
      resetForm();
      navigate("/");
    }
  }, [depositData, submissionSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      window.alert("Please select at least one product.");
      return;
    }

    if (Object.keys(amounts).length === 0) {
      window.alert("Please enter payment amounts.");
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

    const newDepositData = {
      selectedProducts: selectedProductsData,
      customerDetails: {
        customerName: customerDetails.customerName,
        customerNumber: parseFloat(customerDetails.customerNumber),
      },
      paymentMethod: {
        amounts: amountsForBackend,

        installments: parseFloat(installments),
        dates,
        installmentAmounts: parseFloat(installmentAmounts),
      },
      notes,
      timestamp: formattedDateTime,
    };

    try {
      const response = await fetch("http://localhost:3001/salesdeposits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepositData),
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
    setDepositData(newDepositData);
    console.log(depositData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold mb-4"> Sales Deposit Form</h2>

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
      <fieldset className="mt-4">Total Payment: {totalPayment}</fieldset>
      <form className="mt-4" onSubmit={handleSubmit}>
        <fieldset className="mt-4">
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600 mr-2">
              Pick Up Installments:
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={installments}
              onChange={handleInstallmentsChange}
            >
              {[1, 2, 3].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {Array.from({ length: installments }).map((_, index) => (
            <div className="flex flex-col mb-4" key={index}>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-600">
                  Pick Up Date for {index + 1} Installment :
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
                    Quantity picked up in {index + 1} Installment :
                  </label>
                  <input
                    className="w-full p-2 border rounded-md my-2"
                    type="number"
                    value={pickUpQuantities[index]}
                    onChange={(event) =>
                      handlePickUpQuantityChange(index, event)
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-600 mr-2">
              Notes:
            </label>
            <textarea
              value={notes}
              className="w-full p-2 border rounded-md"
              placeholder="Other notes about Deposit Sales"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <fieldset className="border p-4 mb-4">
            <CustomerSearch />
            <legend className="text-lg font-semibold">Customer Details</legend>

            <CustomerNameAndNumber />
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

export default SalesDeposit;
