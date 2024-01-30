import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ selectedDateOption, handleDateOptionChange }) => {
  return <DatePicker selected={selectedDateOption} onChange={handleDateOptionChange} />;
};

export default DatePickerComponent;
