import React, { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [amounts, setAmounts] = useState({});

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + parseFloat(product.subtotal),
      0
    );
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        selectedProduct,
        setSelectedProduct,
        calculateTotalPrice,
        selectedOptions,
        setSelectedOptions,
        amounts,
        setAmounts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
