import React from "react";
import AddSalesForm from "./components/AddSalesForm";
import ProductForm from "./components/ProductForm";
import AddExpenseForm from "./components/AddExpenseForm";
import DebtSales from "./components/DebtSales";
import SalesDeposit from "./components/SalesDeposit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AddSalesForm />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/addexpenseform" element={<AddExpenseForm />} />
        <Route path="/debtsales" element={<DebtSales />} />
        <Route path="/salesdeposit" element={<SalesDeposit />} />
      </Routes>
    </Router>
  );
};

export default App;
