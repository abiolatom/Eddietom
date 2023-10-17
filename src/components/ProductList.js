import React, {useContext} from "react";
import { AppContext } from "../context/AppContext";

const ProductList = (_name) => {
  const { products } = useContext(AppContext);
  
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h3>{product.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
