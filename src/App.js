import React from "react";
import AddSalesForm from "./components/AddSalesForm";
import ProductForm from "./components/ProductForm";
import AddExpenseForm from "./components/AddExpenseForm";
import DebtSales from "./components/DebtSales";
import SalesDeposit from "./components/SalesDeposit";
import Payments from "./components/Payments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ProductProvider } from "./components/ProductContext";

const App = () => {
  return (
    <ProductProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AddSalesForm />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/addexpenseform" element={<AddExpenseForm />} />
        <Route path="/debtsales" element={<DebtSales />} />
        <Route path="/salesdeposit" element={<SalesDeposit />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      </Router>
      </ProductProvider>
  );
};

export default App;
