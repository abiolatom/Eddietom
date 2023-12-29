import AddProduct from "./AddProduct";
import { ProductProvider } from "./ProductContext";

const AddSalesForm = () => {
  return (
    <ProductProvider>
      <AddProduct />
    </ProductProvider>
  );
};

export default AddSalesForm;
