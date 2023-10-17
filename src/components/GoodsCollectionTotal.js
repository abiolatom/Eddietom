import React, { useState } from "react";

const GoodsCollectionTotal = () => {
  const [totalCollected, setTotalCollected] = useState("");
  const handleTotalCollected = (e) => {
    setTotalCollected(e.target.value);
  };
  return (
    <div className="collectedTotal">
      <label htmlFor="collectedTotal">Total Collected</label>
      <input
        id="collectedTotal"
        placeholder="how many goods were collected?"
        onChange={handleTotalCollected}
        value={totalCollected}
      ></input>
    </div>
  );
};

export default GoodsCollectionTotal;
