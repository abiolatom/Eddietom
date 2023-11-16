import React, { createContext, useContext, useState } from 'react'


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + parseFloat(product.subtotal), 0);
    };

    return (
        <ProductContext.Provider value={{ selectedProducts, setSelectedProducts, calculateTotalPrice }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
}