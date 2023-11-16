import React from "react";
import AddProduct from "./components/AddProduct";
import "./App.css";
import PaymentMethod from "./components/PaymentMethod";


const App = () => {

  return (
    <div className="container">
      <h1>Sales Form</h1>
      <AddProduct />
      <PaymentMethod />
     
    </div>
  );
};

export default App;
