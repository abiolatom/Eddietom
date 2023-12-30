import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

const SalesDeposit = () => {
  const navigate = useNavigate();

  const {
    selectedProducts,
    setSelectedProducts,
    calculateTotalPrice,
    amounts,
    setAmounts,
  } = useContext(ProductContext);

  return (
    <div>
      <h2>Sales Deposit Form</h2>
      <button
        className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        {" "}
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
      <form></form>
    </div>
  );
};

export default SalesDeposit;
