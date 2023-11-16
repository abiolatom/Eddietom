import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductList as products } from "./ProductList";
import { useProductContext } from "./ProductContext";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const { selectedProducts, setSelectedProducts, calculateTotalPrice } =
    useProductContext();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [productSubtotal, setProductSubtotal] = useState("");

  const filterText = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filterProductList = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilterProduct(filterProductList);

    const suggestion = filterProductList.filter((suggestion) => {
      return suggestion.name.toLowerCase().startsWith(value);
    });
    setSuggestions(suggestion);
  };

  const handleSuggestionClick = (filterText) => {
    setProductName(filterText.name);
    setSearchText(filterText.name);

    setSuggestions([]);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setProductPrice(value);
    }
    if (productQuantity !== null) {
      const subtotal = parseFloat(value) * parseFloat(productQuantity);
      setProductSubtotal(subtotal.toFixed(2));
    }
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setProductQuantity(value);
    }
    if (productPrice !== "") {
      const newSubtotal = parseFloat(productPrice) * parseFloat(value);
      setProductSubtotal(newSubtotal);
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (!productName || !productPrice || !productQuantity) {
      alert("Please input a Product, Price, and Price");
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      subtotal: productSubtotal,
    };

    setSelectedProducts([...selectedProducts, newProduct]);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setSearchText("");
  };

  const handleDeleteProduct = (productId) => {
    const updateDelProduct = selectedProducts.filter(
      (prod) => prod.id !== productId
    );
    setSelectedProducts(updateDelProduct);
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

        <input
          value={productQuantity}
          type="text"
          onChange={handleQuantityChange}
          placeholder="Enter Quantity"
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {selectedProducts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th> Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>SubTotal</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td> {product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.subtotal}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <b>Total Price: </b>
              </td>
              <td colSpan="2">
                <b>{Number(calculateTotalPrice())} </b>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddProduct;
