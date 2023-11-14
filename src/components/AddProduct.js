import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const intialProduct = [
  {
    id: 1,
    name: "",
    price: "",
  },
];

const AddProduct = (name, price) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(intialProduct);

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
      setProductName("");
      setProductPrice("");

  };

  return (
    <div className="container">
      <form>
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Add Product"
          required
        />
        <input
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Enter Price"
          required
        />
        <button type="submit" onClick={handleAddProduct}>
          Add Product
        </button>
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
