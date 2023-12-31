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
  const [amounts, setAmounts] = useState({});
  const [salesData, setSalesData] = useState({});
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
  const resetForm = () => {
    setCustomerDetails({
      customerName: "",
      customerNumber: "",
    });
    setSelectedOptions([]);
    setAmounts({});
    setSelectedProducts([]);
    setSalesData({});
    setAmounts({});
    setDebtSalesData({});
    setSubmissionSuccess(false);
  };
  const handleAmountChange = (event, value) => {
    const newAmount = { ...amounts };
    newAmount[value] = event.target.value;

    if (
      selectedOptions.some((option) => option.value === value) &&
      event.target.value &&
      parseFloat(event.target.value) > 0
    ) {
      const newSelectedOptions = [...selectedOptions];
      const index = newSelectedOptions.findIndex(
        (option) => option.value === value
      );

      if (index !== -1) {
        newSelectedOptions[index].amounts = parseFloat(event.target.value);
        setSelectedOptions(newSelectedOptions);
      }
    }

    if (paymentOptions.paymentOption === "bankPayment") {
      const newBankPayment = { ...bankPayment };
      newBankPayment.amount = parseFloat(event.target.value);
      setBankPayment(newBankPayment);
    }
    setAmounts(newAmount);
  };

  const handleOptionChange = (value) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.findIndex(
      (option) => option.value === value
    );

    if (paymentOptions.paymentOption === "bankPayment") {
      setBankPayment({ amount: 0, bankName: "" }); // Reset bank payment details
    }

    if (index !== -1) {
      newSelectedOptions.splice(index, 1);
      const newAmounts = { ...amounts };
      delete newAmounts[value];

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
        {paymentOptions.map((option) => {
          const selectedOption = selectedOptions.find(
            (selectedOption) => selectedOption.value === option.value
          );
          const isChecked = !!selectedOption;
          const paymentInput = isChecked ? (
            <input
              id="checkedOptionValue"
              type="number"
              name="checkedOptionValue"
              placeholder={`Enter amount paid by ${option.label}`}
              value={amounts[option.value] || ""}
              onChange={(e) => handleAmountChange(e, option.value)}
              className="w-full p-2 border rounded-md mt-1"
            />
          ) : null;
          return (
            <div key={option.paymentOption} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOptionChange(option.value)}
                value={option.value}
                className="mr-2"
              />
              <label className="mr-3">{option.label} </label>
              {paymentInput}
              {isChecked && (
                <span className="text-gray-600">
                  (Paid:
                  {amounts[option.value] || 0})
                </span>
              )}

              {isChecked && option.paymentOption === "bankPayment" && (
                <div className="ml-4">
                  <select
                    value={bankPayment.bankName}
                    onChange={(e) =>
                      setBankPayment({
                        ...bankPayment,
                        bankName: e.target.value,
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
          );
        })}
      </div>
    );
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        customerDetails,
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
