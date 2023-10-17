import { useState } from "react";
import ProductList from "./ProductList";

const AddSalesForm = () => {
  const [productSearch, setProductSearch] = useState("");
  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
  };

  const filteredProduct = ProductList.filter((product) => {
    return product.name.tolower().includes(productSearch.toLowerCase());
  });

  return (
    <form className="form-control">
      <div className="addSalesForm-col">
        <div className="product">
          <label htmlFor="product">Products</label>
          <input
            value={productSearch}
            onChange={handleProductSearch}
            type="search"
            required
            id="product"
            placeholder="Select Product"
          />
          <ProductList products={filteredProduct} />
        </div>

        <div className="quantity">
          <label htmlFor="quantity">Quantity Sold</label>
          <input
            type="text"
            required
            id="product"
            placeholder="Enter Quantity Sold"
          ></input>
        </div>
      </div>
    </form>
  );
};

export default AddSalesForm;
