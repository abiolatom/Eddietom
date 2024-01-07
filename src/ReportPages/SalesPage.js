import React, { useEffect, useState } from 'react';

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/sales');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sales Page</h1>
      {salesData.map((sale) => (
        <div key={sale._id}>
          <h2>Customer: {sale.customerDetails.customerName}</h2>
          <p>Total Payment: {sale.totalPayment}</p>

          <h3>Selected Products:</h3>
          <ul>
            {sale.selectedProducts.map((product) => (
              <li key={product.id}>
                {product.productName} - Quantity: {product.quantity} - Subtotal: {product.subtotal}
              </li>
            ))}
          </ul>

          <h3>Amounts:</h3>
          {sale.amounts.bankPayment && (
            <div>
              <p>Bank Payment: {sale.amounts.bankPayment}</p>
              <p>Bank Name: {sale.amounts.bankName}</p>
            </div>
          )}
          {sale.amounts.posPayment && <p>POS Payment: {sale.amounts.posPayment}</p>}
          {sale.amounts.cashPayment && <p>Cash Payment: {sale.amounts.cashPayment}</p>}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default SalesPage;
