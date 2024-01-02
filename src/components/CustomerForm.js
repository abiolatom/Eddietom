import React, { useState } from "react";

const CustomerForm = () => {
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerNumber: "",
    customerAddress: "",
    customerCity: "",
    customerCategory: "",
  });
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Trigger search function to fetch matches
    fetchCustomerMatches(searchQuery);
  };
  const fetchCustomerMatches = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3001/customerdata?searchQuery=${query}`
      );
      const matches = await response.json();
      // Update state with matches
      setMatches(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleMatchSelection = (match) => {
    setCustomerDetails(match);
    // Clear search query and matches
    setSearchQuery("");
    setMatches([]);
  };
  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "customerNumber") {
      newValue = value.replace(/[^0-9]/g, "");

      newValue = newValue.slice(0, 11);
    }

    setCustomerDetails((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const checkForDuplicateCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customerdata/checkduplicate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerDetails.customerName,
          customerNumber: customerDetails.customerNumber,
        }),
      });
      const isDuplicate = await response.json();
      return isDuplicate;
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return false; // Assume no duplicates if error occurs
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for duplicates before submission
    const isDuplicate = await checkForDuplicateCustomer();
    if (isDuplicate) {
      // Display an error message
      alert('Customer already exists!');
      return;
    }
  
    // Proceed with submission if no duplicates found
    try {
      const response = await fetch("http://localhost:3001/customerdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerDetails),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          id="customerSearch"
          name="customerSearch"
          placeholder="Search by name or number"
          className="w-full p-2 border rounded-md"
          onChange={handleSearchInputChange}
        />
        <ul className="list-group">
          {matches.map((match) => (
            <li key={match.id} className="list-group-item">
              {match.customerName} - {match.customerNumber}
              <button onClick={() => handleMatchSelection(match)}>
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="border p-4 mb-4">
          <legend className="text-lg font-semibold">Customer Details</legend>
          <div className="mb-2">
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={customerDetails.customerName}
              onChange={handleCustomerDetailsChange}
              placeholder="Enter Customer Name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-2">
            <input
              placeholder="Enter Customer Phone Number"
              className="w-full p-2 border rounded-md"
              type="tel"
              id="customerNumber"
              name="customerNumber"
              value={customerDetails.customerNumber}
              onChange={handleCustomerDetailsChange}
            />
            {isNaN(customerDetails.customerNumber) && (
              <p className="text-red-500">
                Please enter a valid numeric value.
              </p>
            )}
          </div>
          <div className="mb-2">
            <input
              placeholder="Enter Customer Address"
              className="w-full p-2 border rounded-md"
              type="text"
              id="customerAddress"
              name="customerAddress"
              value={customerDetails.customerAddress}
              onChange={handleCustomerDetailsChange}
            />
          </div>

          <div className="mb-2">
            <input
              placeholder="Enter Customer City"
              className="w-full p-2 border rounded-md"
              type="text"
              id="customerCity"
              name="customercity"
              value={customerDetails.customercity}
              onChange={handleCustomerDetailsChange}
            />
          </div>
          <div className="mb-2">
            <select
              id="customerCategory"
              name="customerCategory"
              value={customerDetails.customerCategory}
              onChange={handleCustomerDetailsChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Customer Category</option>
              <option value="Reseller">Reseller</option>
              <option value="End User">End User</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </fieldset>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
