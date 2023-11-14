import React, { useState } from "react";

let nextId = 0;

const AddProduct = (name, price) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProduct = (event) => {
    event.preventDefault();
    setSelectedProducts([
      ...selectedProducts,
      { id: nextId++, productName: name, productPrice: price },
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
            <tr>
              {selectedProducts.map((product) => (
                <>
                  <td> {product.name}</td>
                  <td>{product.price}</td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
