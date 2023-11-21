import React from "react";
import AddProduct from "./AddProduct";
import { ProductProvider } from "./ProductContext";
import PaymentMethod from "./PaymentMethod";
import GoodStatus from "./GoodStatus";
import ProductForm from "./ProductForm";
const AddSalesForm = () => {
  return (
    <ProductProvider>
      <AddProduct />
      <PaymentMethod />
      <GoodStatus />
      <ProductForm />
    </ProductProvider>
  );
};

export default AddSalesForm;
