import React, { useState, useEffect } from 'react';

const SalesForm = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch products based on the search text
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint for fetching products
        const response = await fetch(`/products?search=${searchText}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchText]);

  // Update selected product when the user chooses one from the suggestions
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearchText(product.name); // Populate search input with selected product name
  };

  // Add selected product to the table
  const handleAddToTable = () => {
    if (selectedProduct && price && quantity) {
      const subtotal = parseFloat(price) * parseInt(quantity, 10);
      const newItem = {
        productName: selectedProduct.name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        subtotal,
      };

      setSalesData([...salesData, newItem]);
      setTotal(total + subtotal);

      // Clear input fields
      setSelectedProduct(null);
      setPrice('');
      setQuantity('');
      setSearchText('');
    }
  };

  return (
    <div>
      <div>
        <label>Product Search:</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ul>
          {products.map((product) => (
            <li key={product.id} onClick={() => handleSelectProduct(product)}>
              {product.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Quantity:</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button onClick={handleAddToTable}>Add to Table</button>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SalesForm;
