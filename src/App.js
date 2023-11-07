import React from "react";
import { AppProvider } from "./context/AppContext";
import AddSalesForm from "./components/AddSalesForm";
import "./App.css";

const App = () => {
  return (
    <AppProvider>
      <div className="container">
        <h1>Sales Form</h1>
        <AddSalesForm/>
      </div>
    </AppProvider>
  );
};

export default App;
