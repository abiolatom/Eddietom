import React, { useState } from "react";

const PaymentMethod = () => {
  const payMethod = ["Cash", "Bank Transfer", "POS"];

  const [selectedPayMethod, setSelectedPayMethod] = useState("");
  const handleChangePayMethod = (e) => {
    setSelectedPayMethod(e.target.value);
  };

  return (
    <div className="payMethod">
      <select value={selectedPayMethod} onChange={handleChangePayMethod}>
        {payMethod.map((payMethod) => (
          <options key={payMethod} type="option" value={payMethod}>
            {payMethod}
          </options>
        ))}
      </select>
    </div>
  );
};

export default PaymentMethod;
