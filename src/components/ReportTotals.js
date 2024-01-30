import React from "react";

const ReportTotals = ({ totalQuantityByProduct, totalPayments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Total Quantity Sold by Product:</h2>
      <ul className="list-disc pl-6 mb-4">
        {Object.entries(totalQuantityByProduct).map(([productName, quantity]) => (
          <li key={productName} className="text-gray-700">
            {productName}: {quantity}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-4">Total Payments:</h2>
      <div className="flex flex-col space-y-2">
        <p className="text-gray-700">Cash Payment: {totalPayments.cashPayment}</p>
        <p className="text-gray-700">Bank Payment: {totalPayments.bankPayment}</p>
        <p className="text-gray-700">POS Payment: {totalPayments.posPayment}</p>
      </div>
    </div>
  );
};

export default ReportTotals;
