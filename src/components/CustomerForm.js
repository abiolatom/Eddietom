import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

const CustomerNameAndNumber = () => {
  const { customerDetails, handleCustomerDetailsChange } =
    useContext(ProductContext);

  return (
    <div>
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
          <p className="text-red-500">Please enter a valid numeric value.</p>
        )}
      </div>
    </div>
  );
};

const CustomerSearch = () => {
  const { setCustomerDetails } = useContext(ProductContext);
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    fetchCustomerMatches(searchQuery);
  };
  const fetchCustomerMatches = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3001/customerdata?searchQuery=${query}`
      );
      const matches = await response.json();
      setMatches(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleMatchSelection = (match) => {
    setCustomerDetails(match);
    setSearchQuery("");
    setMatches([]);
  };

  return (
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
            <button onClick={() => handleMatchSelection(match)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomerForm = () => {
  const { customerDetails, handleCustomerDetailsChange } =
    useContext(ProductContext);
  const checkForDuplicateCustomer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/customerdata/checkduplicate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: customerDetails.customerName,
            customerNumber: customerDetails.customerNumber,
          }),
        }
      );
      const isDuplicate = await response.json();
      return isDuplicate;
    } catch (error) {
      console.error("Error checking for duplicates:", error);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = await checkForDuplicateCustomer();
    if (isDuplicate) {
      alert("Customer already exists!");
      return;
    }

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
      <CustomerSearch />
      <form onSubmit={handleSubmit}>
        <fieldset className="border p-4 mb-4">
          <legend className="text-lg font-semibold">Customer Details</legend>
          <CustomerNameAndNumber />
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
              name="customerCity"
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
export { CustomerSearch, CustomerNameAndNumber };
export default CustomerForm;
