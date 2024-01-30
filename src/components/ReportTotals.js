import React from "react";

const ReportTotals = ({ totalQuantityByProduct, totalPayments }) => {
  return (
    <div>
      <h2>Total Quantity Sold by Product:</h2>
      <ul>
        {Object.entries(totalQuantityByProduct).map(
          ([productName, quantity]) => (
            <li key={productName}>
              {productName}: {quantity}
            </li>
          )
        )}
      </ul>

      <h2>Total Payments:</h2>
      <p>Cash Payment: {totalPayments.cashPayment}</p>
      <p>Bank Payment: {totalPayments.bankPayment}</p>
      <p>POS Payment: {totalPayments.posPayment}</p>
    </div>
  );
};

export default ReportTotals;
