import AddProduct from "./AddProduct";
import { ProductProvider } from "./ProductContext";
import PaymentMethod from "./PaymentMethod";
import Payments from "./Payments";
// import SalesForm from "./SalesForm";

const AddSalesForm = () => {
  return (
    <ProductProvider>
      <AddProduct />

      <Payments />
    </ProductProvider>
  );
};

export default AddSalesForm;
