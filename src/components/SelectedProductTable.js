import React, { useState } from "react";

const products = [
  { id: 12, name: "shopping", cost: 40 },
  { id: 13, name: "holiday", cost: 400 },
  { id: 14, name: "car service", cost: 50 },
];

export const SearchBar = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState("");
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
      const selectedProduct = products.find((product) =>
        product.name.toLowerCase() === searchText.toLowerCase());
      if (selectedProduct) {
        setSelectedProducts([...selectedProducts, selectedProduct]);
        setPrice("");
        setSearchText("");
      }
    }
  };
  

  return (
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
  );
};

const SelectedProductTable = () => {
  return <div></div>;
};

export default SelectedProductTable;
