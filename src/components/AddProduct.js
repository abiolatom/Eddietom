import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductList as products } from "./ProductList";
import { useProductContext } from "./ProductContext";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const {
    selectedProducts,
    setSelectedProducts,
    calculateTotalPrice,
    selectedProduct,
    setSelectedProduct,
  } = useProductContext();
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

    const existingProduct = selectedProducts.find(
      (p) => p.name === productName
    );
    if (existingProduct) {
      alert(`Product ${existingProduct.name} already exist. Update it instead`);
    } else {
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
    }
  };

  const handleUpdateProductClick = (product) => {
    setSearchText(product.name);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    setProductSubtotal(product.subtotal);
    setSelectedProduct(product);
  };

  const handleUpdateSelectedProduct = (e) => {
    e.preventDefault();
    console.log("selectedProduct:", selectedProduct);
    console.log("selectedProducts before update:", selectedProducts);
    if (!selectedProduct) {
      return;
    }
  
    const updatedProduct = selectedProduct;
    updatedProduct.name = productName || searchText;
    updatedProduct.price = productPrice;
    updatedProduct.quantity = productQuantity;
    updatedProduct.subtotal = productSubtotal;
  
    // Replace the existing product with the updated product
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === selectedProduct.id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
  
    // Set the updated `selectedProducts` state
    setSelectedProducts(updatedSelectedProducts);
  
    // Clear the product form fields
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setSearchText("");
    setSelectedProduct(null);
  
    // Log the updated `selectedProduct` and `selectedProducts` arrays
    console.log("updatedProduct:", updatedProduct);
    console.log("selectedProducts after update:", updatedSelectedProducts);
  };
  

  const handleCancelSelectedProduct = () => {
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setSearchText("");
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    const updateDelProduct = selectedProducts.filter(
      (prod) => prod.id !== productId
    );
    setSelectedProducts(updateDelProduct);
  };

  return (
    <div className="container">
      <form
        onSubmit={(event) =>
          selectedProduct
            ? handleUpdateSelectedProduct(event)
            : handleAddProduct(event)
        }
      >
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
        {selectedProduct ? (
          <div>
            <button type="submit" onClick={handleUpdateSelectedProduct}>
              Save
            </button>
            <button onClick={handleCancelSelectedProduct}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Product</button>
        )}
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
                  <button onClick={() => handleUpdateProductClick(product)}>
                    Update
                  </button>
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
