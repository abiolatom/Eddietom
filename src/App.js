import React from "react";
import AddSalesForm from "./components/AddSalesForm";
import {SearchBar} from "./components/SelectedProductTable";
import "./App.css";

const App = () => {
  return (
   
      <div className="container">
        <h1>Sales Form</h1>
        <AddSalesForm/>
       <SearchBar/>
      </div>
   
  );
};

export default App;
