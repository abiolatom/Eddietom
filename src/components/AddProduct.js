import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const products = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Carrot" },
  { id: 4, name: "Date" },
  { id: 5, name: "Eggplant" },
  { id: 6, name: "Anoti" },
  { id: 7, name: "Bonam" },
  { id: 8, name: "Cague" },
  { id: 9, name: "Datti" },
  { id: 10, name: "Eggrow" },
];

const initialProduct = [
  {
    id: 0,
    name: "",
    price: "",
  },
];

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(initialProduct);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  const filterText = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filterProductList = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilterProduct(filterProductList);

    const suggestion = filterProduct.filter((suggestion) => {
      return suggestion.name.toLowerCase().startsWith(value);
    });
    setSuggestions({ name: suggestion.name });
  };

  const handleSuggestionClick = (suggestion) => {
    setProductName(suggestion.name);

    setSuggestions([]);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setProductPrice(value);
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (!productName || !productPrice) {
      alert("Please input a Product and Price");
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      { id: uuidv4(), productName: productName, productPrice: productPrice },
    ]);
    setProductName({ name: "" });
    setProductPrice("");
  };

  return (
    <div className="container">
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={searchText}
          onChange={filterText}
          placeholder="Add Product"
          required
        />
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
        <input
          value={productPrice}
          type="text"
          onChange={handlePriceChange}
          placeholder="Enter Price"
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th> Product Name</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td> {product.productName}</td>
                <td>{product.productPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
