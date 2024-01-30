import React from "react";
import AddProduct from "./components/AddProduct";
import ProductForm from "./components/ProductForm";
import AddExpenseForm from "./components/AddExpenseForm";
import DebtSales from "./components/DebtSales";
import SalesDeposit from "./components/SalesDeposit";
import Payments from "./components/Payments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ProductProvider } from "./components/ProductContext";
import CustomerForm from "./components/CustomerForm";
import AddIncomeForm from "./components/AddIncomesForm";
import SalesPage from "./components/SalesPage";


const App = () => {
  return (
    <ProductProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/addexpenseform" element={<AddExpenseForm />} />
          <Route path="/addincomeform" element={<AddIncomeForm />} />
          <Route path="/debtsales" element={<DebtSales />} />
          <Route path="/salesdeposit" element={<SalesDeposit />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/customerform" element={<CustomerForm />} />
          <Route path="/salespage" element={<SalesPage />} />

        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
