import React, { useState } from "react";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState([
    {
      cash: "",
      bankTransfer: "",
      pos: "",
    },
  ]);

  return (
    <div>
      <h2>Payment Method</h2>
      <input placeholder="Select Payment Method"></input>
    </div>
  );
};

export default PaymentMethod;
