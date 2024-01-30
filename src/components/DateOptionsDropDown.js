import React from "react";

const DateOptionsDropdown = ({ selectedDateOption, handleDateOptionChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Select Date Option:</label>
      <select
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        value={selectedDateOption}
        onChange={(e) => handleDateOptionChange(e.target.value)}
      >
        <option value="selectedDate">Selected Date</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last2days">Last 2 Days</option>
        <option value="lastWeek">Last Week</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
      </select>
    </div>
  );
};

export default DateOptionsDropdown;
