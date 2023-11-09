import React, { useState } from "react";
import { ProductSearchBar } from "./ProductSearchBar";

export const ProductBar = () => {
  const [price, setPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleAddProduct = () => {
    if (selectedProductName && price !== "") {
      const newProduct = {
        name: selectedProductName,
        price: parseFloat(price),
      };

      setSelectedProducts([...selectedProducts, newProduct]);
      setSelectedProductName("");
      setPrice("");
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  };

  return (
    <div>
      <form>
        <ProductSearchBar
          onProductSearch={(productName) => setSelectedProductName(productName)}
        />
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter Price"
        />

        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, id) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: {calculateTotalPrice()}</p>
    </div>
  );
};
