import React, { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const paymentOptions = [
    { paymentOption: "cash", label: "Cash" },
    { paymentOption: "bankPayment", label: "Bank Transfer" },
    { paymentOption: "posPayment", label: "POS" },
  ];

  const bankOptions = ["First Bank", "MoniePoint", "Others"];
  const [cashPayment, setCashPayment] = useState("");
  const [bankPayment, setBankPayment] = useState({ amount: 0, bankName: "" });
  const [posPayment, setPosPayment] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [debtSalesData, setDebtSalesData] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [amounts, setAmounts] = useState({
    cashPayment: { amount: 0 },
    bankPayment: { amount: 0, bankName: "" },
    posPayment: { amount: 0 },
  });
  
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerNumber: "",
    customerCategory: { reseller: "", endUser: "" },
    customerAddress: "",
  });

  const handleBankNameChange = (event) => {
    setBankPayment({ ...bankPayment, bankName: event.target.value });
  };
  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "customerNumber") {
      newValue = value.replace(/[^0-9]/g, "");

      newValue = newValue.slice(0, 11);
    }

    setCustomerDetails((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + parseFloat(product.subtotal),
      0
    );
  };

  const totalPayment = Object.values(amounts).reduce(
    (acc, paymentOption) => acc + parseFloat(paymentOption.amount) || 0,
    0
  );

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
  const resetForm = () => {
    setCustomerDetails({
      customerName: "",
      customerNumber: "",
    });
    setSelectedOptions([]);
    setAmounts({});
    setSelectedProducts([]);
    
    setAmounts({});
    setDebtSalesData({});
    setSubmissionSuccess(false);
  };
  const handleAmountChange = (event, paymentOption) => {
    const newAmounts = { ...amounts };
    if (!newAmounts[paymentOption]) {
      newAmounts[paymentOption] = {};
    }
    if (paymentOption === "bankPayment") {
      newAmounts[paymentOption].bankName = "";
    }
    newAmounts[paymentOption].amount = parseFloat(event.target.value);

    if (newAmounts[paymentOption].amount > 0) {
      const existingOptionIndex = selectedOptions.findIndex(
        (option) => option.value === paymentOption
      );
      if (existingOptionIndex === -1) {
        selectedOptions.push({
          value: paymentOption,
          amounts: newAmounts[paymentOption].amount,
        });
      } else {
        selectedOptions[existingOptionIndex].amounts =
          newAmounts[paymentOption].amount;
      }
    } else {
      // Remove the option if the amount is zero
      const newSelectedOptions = selectedOptions.filter(
        (option) => option.value !== paymentOption
      );
      setSelectedOptions(newSelectedOptions);
    }

    setAmounts(newAmounts);
  };

  const handleOptionChange = (value) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.findIndex(
      (option) => option.value === value
    );

    if (value === "bankPayment") {
      setBankPayment({ amount: 0, bankName: "" });
    }

    if (index !== -1) {
      newSelectedOptions.splice(index, 1);
      const newAmounts = { ...amounts };
      newAmounts[value] = {}; // Initialize the amounts object for the removed option
      setAmounts(newAmounts);
    } else {
      const selectedOption = { value, amounts: 0 };
      newSelectedOptions.push(selectedOption);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const optionsRender = () => {
    return (
      <div className="mt-2">
        {paymentOptions.map((option) => (
          <div key={option.paymentOption} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedOptions.some(
                (o) => o.value === option.paymentOption
              )}
              onChange={() => handleOptionChange(option.paymentOption)}
              value={option.paymentOption}
              className="mr-2"
            />
            <label className="mr-3">{option.label}</label>
            {selectedOptions.some((o) => o.value === option.paymentOption) && (
              <div className="ml-4">
                <input
                  type="number"
                  placeholder={`Enter amount paid by ${option.label}`}
                  value={amounts[option.paymentOption]?.amount || ""}
                  onChange={(e) => handleAmountChange(e, option.paymentOption)}
                  className="w-full p-2 border rounded-md mt-1"
                />
                {option.paymentOption === "bankPayment" && (
                  <div className="mt-2">
                    <select
                      value={amounts[option.paymentOption]?.bankName}
                      onChange={(e) =>
                        setAmounts({
                          ...amounts,
                          [option.paymentOption]: {
                            ...amounts[option.paymentOption],
                            bankName: e.target.value,
                          },
                        })
                      }
                    >
                      {bankOptions.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        customerDetails,
        submissionSuccess,
        setSubmissionSuccess,
        paymentComparison,
        handleCustomerDetailsChange,
        setCustomerDetails,
        setSelectedProducts,
        selectedProduct,
        optionsRender,
        setSelectedProduct,
        calculateTotalPrice,
        handleBankNameChange,
        selectedOptions,
        setSelectedOptions,
        amounts,
        totalPayment,
        setAmounts,
        resetForm,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
