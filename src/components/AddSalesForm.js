import AddProduct from "./AddProduct";
import { ProductProvider } from "./ProductContext";
import PaymentMethod from "./PaymentMethod";
// import SalesForm from "./SalesForm";

const AddSalesForm = () => {
  return (
    <ProductProvider>
      <AddProduct />

      <PaymentMethod />
    </ProductProvider>
  );
};

export default AddSalesForm;
