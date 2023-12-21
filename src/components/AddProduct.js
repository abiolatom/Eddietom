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
    <div className="container mx-auto p-4">
      <form
        className="mb-4"
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
          className="w-full p-2 border rounded-md font-semi-bold"
        />
        <ul className="mt-2">
          {suggestions.map((suggestion) => (
            <li
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
        <input
          value={productPrice}
          className="w-full mt-2 p-2 border rounded-md font-semibold"
          type="text"
          onChange={handlePriceChange}
          placeholder="Enter Price"
          required
        />

        <input
          value={productQuantity}
          type="text"
          onChange={handleQuantityChange}
          className="w-full mt-2 p-2 border rounded-md font-semibold"
          placeholder="Enter Quantity"
          required
        />
        {selectedProduct ? (
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-blue-600"
              type="submit"
              onClick={handleUpdateSelectedProduct}
            >
              Save
            </button>
            <button
              className="bg-red-400 text-gray-700 px-4 py-2 my-4 mx-4 rounded-md hover:bg-red-700"
              onClick={handleCancelSelectedProduct}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-green-500 mt-3 ml-10 text-white px-4 py-2 rounded-md hover:bg-green-700"
            type="submit"
          >
            Add Product
          </button>
        )}
      </form>

      {selectedProducts.length > 0 && (
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2"> Product Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">SubTotal</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td className="border p-2"> {product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">{product.subtotal}</td>
                <td className="border p-2">
                  <button
                    className="border bg-blue-500 text-white mx-3 px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleUpdateProductClick(product)}
                  >
                    Update
                  </button>
                  <button
                    className="border bg-red-500 text-white mx-3 px-2 py-1 rounded-md hover:bg-red-600 mx-4"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="border p-2">
                <b>Total Price: </b>
              </td>
              <td colSpan="2" className="border p-2">
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
