import React, { useEffect, useState } from "react";

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Assuming you have a function to fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/sales"
        );
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to group sales data by selected products
  const groupSalesByProducts = () => {
    const groupedSales = {};

    salesData.forEach((sale) => {
      sale.selectedProducts.forEach((product) => {
        const productId = product.id;
        if (!groupedSales[productId]) {
          groupedSales[productId] = {
            productName: product.productName,
            totalQuantity: 0,
          };
        }
        groupedSales[productId].totalQuantity += product.quantity;
      });
    });

    return Object.values(groupedSales);
  };

  const groupedSalesData = groupSalesByProducts();

  return (
    <div>
      <h1>Sales Page</h1>
      {groupedSalesData.map((product) => (
        <div key={product.productId}>
          <h2>Product: {product.productName}</h2>
          <p>Total Quantity Sold: {product.totalQuantity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SalesPage;
