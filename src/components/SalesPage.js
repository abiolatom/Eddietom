import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  subDays,
  startOfYesterday,
  startOfWeek,
  startOfMonth,
} from "date-fns";

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/sales");
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalsForDay = (day) => {
    let totalQuantityByProduct = {};
    let totalPayments = {
      cashPayment: 0,
      bankPayment: 0,
      posPayment: 0,
    };

    salesData.forEach((sale) => {
      if (sale.time.startsWith(day)) {
        sale.selectedProducts.forEach((product) => {
          const productName = product.productName;
          if (!totalQuantityByProduct[productName]) {
            totalQuantityByProduct[productName] = 0;
          }
          totalQuantityByProduct[productName] += product.quantity;
        });

        sale.amounts.forEach((amount) => {
          totalPayments.cashPayment += amount.cashPayment || 0;
          totalPayments.bankPayment += amount.bankPayment || 0;
          totalPayments.posPayment += amount.posPayment || 0;
        });
      }
    });

    return { totalQuantityByProduct, totalPayments };
  };

  // Example: Calculate totals for a specific day (change the date accordingly)
  const currentDate = "2024-01-30";
  const { totalQuantityByProduct, totalPayments } =
    calculateTotalsForDay(currentDate);

  return (
    <div>
      <h1>Sales Page for {currentDate}</h1>

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

export default SalesPage;
