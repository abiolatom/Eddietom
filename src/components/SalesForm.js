import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductList as products } from "./ProductList";
import { useProductContext } from "./ProductContext";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    quantity: "",
    subtotal: "",
  });

  const {
    selectedProducts,
    setSelectedProducts,
    calculateTotalPrice,
    selectedProduct,
    setSelectedProduct,
  } = useProductContext();

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const filterText = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filterProductList = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setSuggestions(filterProductList.filter((suggestion) =>
      suggestion.name.toLowerCase().startsWith(value)
    ));
  };

  const handleSuggestionClick = (filterText) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      name: filterText.name,
    }));
    setSearchText("");
    setSuggestions([]);
  };

  const handleInputChange = (field, value) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [field]: /^\d*\.?\d*$/.test(value) ? value : prevDetails[field],
    }));

    if (field === "quantity" && productDetails.price !== "") {
      const subtotal = parseFloat(productDetails.price) * parseFloat(value);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        subtotal: subtotal.toFixed(2),
      }));
    } else if (field === "price" && productDetails.quantity !== "") {
      const subtotal = parseFloat(value) * parseFloat(productDetails.quantity);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        subtotal: subtotal.toFixed(2),
      }));
    }
  };

  const handleAddOrUpdateProduct = (event) => {
    event.preventDefault();

    if (!productDetails.name || !productDetails.price || !productDetails.quantity) {
      alert("Please input a Product, Price, and Quantity");
      return;
    }

    const existingProduct = selectedProducts.find(
      (p) => p.name === productDetails.name
    );

    if (existingProduct) {
      alert(`Product ${existingProduct.name} already exists. Update it instead`);
    } else {
      const newProduct = {
        id: uuidv4(),
        ...productDetails,
      };

      setSelectedProducts([...selectedProducts, newProduct]);
      setProductDetails({
        name: "",
        price: "",
        quantity: "",
        subtotal: "",
      });
      setSearchText("");
    }
  };

  const handleUpdateProductClick = (product) => {
    setProductDetails(product);
    setSelectedProduct(product);
  };

  const handleCancelSelectedProduct = () => {
    setProductDetails({
      name: "",
      price: "",
      quantity: "",
      subtotal: "",
    });
    setSearchText("");
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (prod) => prod.id !== productId
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <form
        className="mb-4"
        onSubmit={handleAddOrUpdateProduct}
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
          value={productDetails.price}
          className="w-full mt-2 p-2 border rounded-md font-semibold"
          type="text"
          onChange={(e) => handleInputChange("price", e.target.value)}
          placeholder="Enter Price"
          required
        />

        <input
          value={productDetails.quantity}
          type="text"
          onChange={(e) => handleInputChange("quantity", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md font-semibold"
          placeholder="Enter Quantity"
          required
        />
        {selectedProduct ? (
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-blue-600"
              type="submit"
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
          {/* ... (remaining code remains the same) */}
        </table>
      )}
    </div>
  );
};

export default AddProduct;
