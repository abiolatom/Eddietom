import React, { useState } from "react";

const SalesPrice = () => {
  const [salesPrice, setSalesPrice] = useState("");
  const onChange = (e) => {
    setSalesPrice(e.target.value);
  };

  return (
    <div className="salesPrice">
      <label htmlFor="salesPrice">Sales Price</label>
      <input
        type="text"
        value={salesPrice}
        required="required"
        id="product"
        placeholder="Enter Sales Price"
        onChange={onChange}
      />
    </div>
  );
};

export default SalesPrice;
