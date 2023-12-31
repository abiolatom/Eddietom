import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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
  const navigate = useNavigate();

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
  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        customerDetails,
        handleCustomerDetailsChange,
        setCustomerDetails,
        setSelectedProducts,
        selectedProduct,
        setSelectedProduct,
        calculateTotalPrice,
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
