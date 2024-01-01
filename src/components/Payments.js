import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const [redirectPath, setRedirectPath] = useState(""); // New state to store redirect path
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const {
    optionsRender,
    paymentComparison,
    totalPayment,
    submissionSuccess,
    setSubmissionSuccess,
    selectedProducts,
    calculateTotalPrice,
    customerDetails,
    salesData,
    setSalesData,
    handleCustomerDetailsChange,
    amounts,
    resetForm,
  } = useContext(ProductContext);

  useEffect(() => {
    const submitData = async () => {
      try {
        console.log("Submitting Data:", salesData); // Add this line

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
        resetForm();
        navigate("/");
      } catch (error) {
        console.error("Error adding Sales Data:", error);
      }
    };

    if (submissionSuccess && Object.keys(salesData).length > 0) {
      submitData();
    }
  }, [salesData, submissionSuccess]);

  const calculatePaymentStatus = () => {
    const remainingAmount = calculateTotalPrice() - totalPayment;

    if (totalPayment === calculateTotalPrice()) {
      return {
        message: "Total payment matches required amount.",
        shouldRedirect: false,
      };
    } else if (totalPayment > calculateTotalPrice()) {
      setRedirectPath("/SalesDeposit");
      return {
        message: `Total payment is more than required amount by: ${remainingAmount.toFixed(
          2
        )} Do you want to Navigate to Sales Deposit page`,
        shouldRedirect: true,
      };
    } else {
      setRedirectPath("/DebtSales");
      return {
        message: `Total payment is less than required amount by: ${remainingAmount.toFixed(
          2
        )} Do you want to Navigate to Debt Sales page?`,
        shouldRedirect: true,
      };
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      window.alert("Please select at least one product.");
      return;
    }

    if (Object.keys(amounts).length === 0) {
      window.alert("Please enter payment amounts.");
      return;
    }
    const paymentStatus = calculatePaymentStatus();
    if (paymentStatus.shouldRedirect) {
      handleRedirect(paymentStatus.message);
      return;
    }

    const selectedProductsData = selectedProducts.map((product) => ({
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    }));
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const newSaleData = {
      selectedProducts: selectedProductsData,
      customerDetails: {
        ...customerDetails,
        customerNumber: parseFloat(customerDetails.customerNumber),
      },
      amounts: {
        cashPayment: parseFloat(amounts.cashPayment),
        bankPayment: parseFloat(amounts.bankPayment),
        posPayment: parseFloat(amounts.posPayment),
      },
      totalPayment,
      timestamp: formattedDateTime,
    };

    setSubmissionSuccess(true);
    setSalesData(newSaleData);
    window.alert("Sales data submitted successfully!");
  };

  const handleRedirect = (message) => {
    setRedirectMessage(message);
    setShowModal(true);
  };

  const handleRedirectionLogic = (shouldRedirect) => {
    setShowModal(false);

    if (shouldRedirect) {
      const confirmed = window.confirm(
        "Do you want to proceed with the redirection?"
      );
      if (confirmed) {
        navigate(redirectPath);
        console.log("Redirecting to:", redirectPath);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
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

      <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
      <p className="mb-2">
        <em>Amount to pay:</em> <b>{calculateTotalPrice().toFixed(2)}</b>
      </p>
      <p className="mb-2">
        <em>Total paid:</em> <b>{totalPayment.toFixed(2)}</b>
      </p>
      <label className="block text-sm font-semibold mb-2">
        Select Payment Method
      </label>
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
            type="tel"
            id="customerNumber"
            name="customerNumber"
            value={customerDetails.customerNumber}
            onChange={handleCustomerDetailsChange}
          />
          {isNaN(customerDetails.customerNumber) && (
            <p className="text-red-500">Please enter a valid numeric value.</p>
          )}
        </div>
      </fieldset>
      <br />
      <button
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={handleSubmission}
      >
        Submit Sales Details
      </button>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="relative w-auto max-w-sm mx-auto my-6 p-4 bg-white rounded-md shadow-lg">
            <div className="modal-content">
              <p>{redirectMessage}</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  onClick={() => handleRedirectionLogic(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => handleRedirectionLogic(true)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
