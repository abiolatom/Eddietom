import React from "react";

const DateOptionsDropdown = ({
  selectedDateOption,
  handleDateOptionChange,
}) => {
  return (
    <div>
      <label>Select Date Option: </label>
      <select
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
