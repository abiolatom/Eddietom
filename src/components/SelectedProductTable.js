import React, { useState } from "react";

const SelectedProductTable = () => {
  const products = [
    { id: 12, name: "shopping", cost: 40 },
    { id: 13, name: "holiday", cost: 400 },
    { id: 14, name: "car service", cost: 50 },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [price, setPrice] = useState({});

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().include(filteredText.toLowerCase())
  );

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };
  const handleProductChange = (event) => {
    setSelectedProducts(event.target.value);
  };

  return (
    <div>
      <label>Select a Product</label>
      <select
        type="text"
        value={selectedProducts}
        onChange={handleProductChange}
      >
        <option value="">Select a Product</option>
        {filteredProducts.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
        ;
      </select>
      {selectedProducts && (
        <div>
          <label>Price: </label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter Price"
          />
        </div>
      )}
    </div>
  );
};

export default SelectedProductTable;
