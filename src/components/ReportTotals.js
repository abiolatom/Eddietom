import React from "react";

const ReportTotals = ({ totalQuantityByProduct, totalPayments }) => {
  return (
    <div className="mt-8">
      <div className="mb-4 bg-blue-100 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2 text-blue-800">Total Quantity Sold by Product:</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          {Object.entries(totalQuantityByProduct).map(([productName, quantity]) => (
            <div key={productName} className="flex items-center p-3 border-b border-blue-200">
              <p className="text-lg font-semibold">{productName}</p>
              <p className="ml-auto font-bold">{quantity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-100 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2 text-green-800">Total Payments:</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center p-3 border-b border-green-200">
            <p>Cash Payment:</p>
            <p className="ml-auto font-bold">{totalPayments.cashPayment}</p>
          </div>
          <div className="flex items-center p-3 border-b border-green-200">
            <p>Bank Payment:</p>
            <p className="ml-auto font-bold">{totalPayments.bankPayment}</p>
          </div>
          <div className="flex items-center p-3">
            <p>POS Payment:</p>
            <p className="ml-auto font-bold">{totalPayments.posPayment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTotals;
