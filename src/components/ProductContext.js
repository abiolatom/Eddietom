import React, { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const paymentOptions = [
    { paymentOption: "cashPayment", label: "Cash" },
    { paymentOption: "bankPayment", label: "Bank Transfer" },
    { paymentOption: "posPayment", label: "POS" },
  ];

  const bankOptions = ["First Bank", "MoniePoint", "Others"];
  const [bankPayment, setBankPayment] = useState({ amount: 0, bankName: "" });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [amounts, setAmounts] = useState({});

  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerNumber: "",
    customerAddress: "",
    customerCity: "",
    customerCategory: { reseller: "", endUser: "" },
  });

  const handleBankNameChange = (event, paymentOption) => {
    const { value } = event.target;
    setAmounts({
      ...amounts,
      [paymentOption]: {
        ...amounts[paymentOption],
        bankName: value === "defaultBank" ? "" : value,
      },
    });
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
    } else {
      delete newAmounts[paymentOption];

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

      if (newSelectedOptions.length === 0) {
        setAmounts({});
      } else {
        const newAmounts = { ...amounts };
        newAmounts[value] = {};
        setAmounts(newAmounts);
      }
    } else {
      const selectedOption = { value, amounts: 0 };
      newSelectedOptions.push(selectedOption);
      setAmounts({ ...amounts, [value]: {} }); 
    }

    setSelectedOptions(newSelectedOptions);
  };

 
  const optionsRender = () => {
    return (
      <div className="mt-2">
        <fieldset className="border p-4 mb-4">
          <legend className="text-lg font-semibold">Payment Method</legend>

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
              {selectedOptions.some(
                (o) => o.value === option.paymentOption
              ) && (
                <div className="ml-4">
                  <input
                    type="number"
                    placeholder={`Enter amount paid by ${option.label}`}
                    value={amounts[option.paymentOption]?.amount || ""}
                    onChange={(e) =>
                      handleAmountChange(e, option.paymentOption)
                    }
                    className="w-full p-2 border rounded-md mt-1"
                  />
                  {option.paymentOption === "bankPayment" && (
                    <div className="mt-2">
                      <select
                        value={
                          amounts[option.paymentOption]?.bankName ||
                          "defaultBank"
                        }
                        onChange={(e) =>
                          handleBankNameChange(e, option.paymentOption)
                        }
                      >
                        <option value="defaultBank" disabled>
                          Select Bank
                        </option>
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
        </fieldset>
      </div>
    );
  };
  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        customerDetails,
        setCustomerDetails,
        submissionSuccess,
        setSubmissionSuccess,
        paymentComparison,
        handleCustomerDetailsChange,
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
        paymentOptions,
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
