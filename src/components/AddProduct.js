import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProductContext } from "./ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
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
  const [productQuantity, setProductQuantity] = useState("");
  const [productSubtotal, setProductSubtotal] = useState("");

  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchProducts();
    } else {
      setSuggestions([]);
    }
  }, [searchText]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const products = response.data;
      //setSuggestions(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterText = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (value.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3001/products?productName_like=${value}`
        );

        const filterProductList = response.data;
        const filteredSuggestions = filterProductList.filter((suggestion) =>
          suggestion.productName.toLowerCase().includes(value)
        );

        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedProduct) => {
    setProductName(selectedProduct.productName);
    setSearchText(selectedProduct.productName);
    setSuggestions([]); // Clear suggestions array
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
      (p) => p.productName === productName
    );

    if (existingProduct) {
      alert(
        `Product ${existingProduct.productName} already exist. Update it instead`
      );
    } else {
      const newProduct = {
        id: uuidv4(),
        productName: productName,
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
    setSearchText(product.productName);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    setProductSubtotal(product.subtotal);
    setSelectedProduct(product);
  };

  const handleUpdateSelectedProduct = (e) => {
    e.preventDefault();

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

    setSelectedProducts(updatedSelectedProducts);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setSearchText("");
    setSelectedProduct(null);
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
  const totalPrice = calculateTotalPrice();

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
          onChange={(e) => filterText(e)}
          placeholder="Add Product"
          required
          className="w-full p-2 border rounded-md font-semi-bold"
        />

        <ul className="mt-2">
          {suggestions.map((suggestion) => (
            <li
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.productName}
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
                <td className="border p-2"> {product.productName}</td>
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

      <button
        className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => navigate("/payments")}
        disabled={selectedProducts.length === 0}
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default AddProduct;
