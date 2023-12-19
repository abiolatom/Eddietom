import AddProduct from "./AddProduct";
import { ProductProvider } from "./ProductContext";
import PaymentMethod from "./PaymentMethod";
import ProductForm from "./ProductForm";

const
  AddSalesForm = () => {
  return (
    <ProductProvider>
      <AddProduct />
      <PaymentMethod />
      <ProductForm/>
    </ProductProvider>
  );
};

export default AddSalesForm;
