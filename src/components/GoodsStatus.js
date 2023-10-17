import React, { useState } from "react";

const GoodsStatus = () => {
  const goodsStatus = ["Collected", "Not Yet Collected", "Partly Collected"];
  const [selectedGoodsStatus, setSelectedGoodsStatus] = useState("");
  const handleChangeGoodsStatus = (e) => {
    setSelectedGoodsStatus(e.target.value);
  };
  return (
    <div>
      <div className="goodsStatus">
        <label htmlFor="goodsStatus"> Goods Status </label>
        <select value={selectedGoodsStatus} onChange={handleChangeGoodsStatus}>
          {goodsStatus.map((goodsStatus) => (
            <option key={goodsStatus} type="option" value={goodsStatus}>
              {goodsStatus}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GoodsStatus;
