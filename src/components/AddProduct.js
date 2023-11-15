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

const initialProduct = {
  id: "",
  name: "",
  price: "",
  quantity: "",
  subtotal: "",
};

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
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

  /* const handleUpdateProduct = (event, prodId) => {
    event.preventDefault();

    if (!selectedProducts || selectedProducts.length === 0) {
      return;
    }

    const updateSelProduct = {
      id: prodId,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      subtotal: productSubtotal,
    };

    const updateProduct = selectedProducts.map((selProduct) => {
      if (selProduct.id === prodId) {
        return updateSelProduct;
      } else {
        return selProduct;
      }
    });

    setSelectedProducts(updateProduct);
   setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setProductSubtotal("");
  };  
   <button onClick={(event) => handleUpdateProduct(event, product.id)}>
                    Update
                  </button>*/

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.subtotal,
      0
    );
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
          </tbody>
          <h1><em>Total price:</em> {calculateTotalPrice()} </h1>
        </table>
      )}
    </div>
  );
};

export default AddProduct;
