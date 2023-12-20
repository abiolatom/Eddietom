import React from "react";
import "./App.css";
import AddSalesForm from "./components/AddSalesForm";
import ProductForm from "./components/ProductForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <Router>
        
        <Routes>

        </Routes>
     </Router>
      <div className="container">
        <h1>Sales Form</h1>
      </div>
    </div>
  );
};

export default App;
