import React, { useState } from "react";

export const SearchBar = () => {
  const initialProducts = [
    { id: 12, name: "shopping", cost: 40 },
    { id: 13, name: "holiday", cost: 400 },
    { id: 14, name: "car service", cost: 50 },
  ];

  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([initialProducts]);
  const [searchText, setSearchText] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    const filteredProductText = products.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredProducts(filteredProductText);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleAddProduct = () => {
    if (searchText && price) {
      const selectedProduct = products.find(
        (product) => product.name.toLowerCase() === searchText.toLowerCase()
      );
      if (selectedProduct) {
        setSelectedProducts([...selectedProducts, selectedProduct]);
        setPrice("");
        setSearchText("");
      }
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
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search Product..."
        />
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter Price"
        />

        <button onClick={handleAddProduct}>Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr>
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

const SelectedProductTable = () => {
  return <div></div>;
};

export default SelectedProductTable;
