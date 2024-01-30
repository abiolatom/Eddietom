import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./DatePickerComponent";
import DateOptionsDropdown from "./DateOptionsDropDown";
import ReportTotals from "./ReportTotals";
import {
  format,
  subDays,
  startOfYesterday,
  startOfWeek,
  startOfMonth,
  isSameMonth,
} from "date-fns";

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateOption, setSelectedDateOption] = useState("selectedDate");

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
    
  const handleCalendarDateChange = (date) => {
    console.log("Selected Calendar Date: ", date);
    setCalendarDate(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDateOption("selectedDate");
  };

  const handleDateOptionChange = (option) => {
    setSelectedDateOption(option);
  };

  const calculateTotalsForDay = (day) => {
    let totalQuantityByProduct = {};
    let totalPayments = {
      cashPayment: 0,
      bankPayment: 0,
      posPayment: 0,
    };

    salesData.forEach((sale) => {
      const saleDay = format(new Date(sale.timestamp), "yyyy-MM-dd");

      if (
        (selectedDateOption === "thisMonth" &&
          isSameMonth(new Date(sale.timestamp), selectedDate)) ||
        saleDay === day
      ) {
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

  const calculateTotals = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    switch (selectedDateOption) {
      case "today":
        return calculateTotalsForDay(today);
      case "yesterday":
        return calculateTotalsForDay(format(startOfYesterday(), "yyyy-MM-dd"));
      case "last2days":
        return calculateTotalsForDay(
          format(subDays(new Date(), 1), "yyyy-MM-dd")
        );
      case "lastWeek":
        return calculateTotalsForDay(
          format(startOfWeek(subDays(new Date(), 7)), "yyyy-MM-dd")
        );
      case "thisMonth":
        return calculateTotalsForDay(
          format(startOfMonth(selectedDate), "yyyy-MM-dd")
        );
      case "lastMonth":
        return calculateTotalsForDay(
          format(startOfMonth(subDays(selectedDate, 30)), "yyyy-MM-dd")
        );
      case "selectedDate":
      default:
        return calculateTotalsForDay(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  const { totalQuantityByProduct, totalPayments } = calculateTotals();

  return (
    <div>
      <h1>Sales Page</h1>

      <DateOptionsDropdown
        selectedDateOption={selectedDateOption}
        handleDateOptionChange={handleDateOptionChange}
          />
          
          {selectedDateOption === "selectedDate" && (
  <>
    <DatePicker
      selected={calendarDate}
      onChange={handleCalendarDateChange}
      dateFormat="yyyy-MM-dd"
    />
    <br />
  </>
)}

      <ReportTotals
        totalQuantityByProduct={totalQuantityByProduct}
        totalPayments={totalPayments}
      />
    </div>
  );
};

export default SalesReportPage;
