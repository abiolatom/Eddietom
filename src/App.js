import React from "react";
import AddSalesForm from "./components/AddSalesForm";
import { ProductBar } from "./components/ProductBar";
import "./App.css";

const App = () => {
  return (
   
      <div className="container">
        <h1>Sales Form</h1>
        <AddSalesForm/>
       <ProductBar/>
      </div>
   
  );
};

export default App;
