import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <li>
        <Link to="/">Add Sales</Link>
      </li>

      <li>
        <Link to="/ProductForm">Add Product</Link>
      </li>

      <li>
        <Link to="/expenses">Add expenses</Link>
      </li>
    </div>
  );
};

export default NavBar;
