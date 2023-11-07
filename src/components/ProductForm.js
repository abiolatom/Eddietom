import React, { useState } from "react";

const products = [
  { id: 12, name: "shopping", cost: 40 },
  { id: 13, name: "holiday", cost: 400 },
  { id: 14, name: "car service", cost: 50 },
];

const SearchBar = ({
    filterText,
    onFilterTextChange,
    }) => {
    
    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setPrice(value);
        }
    }
   
    return (
            <div>
            <form>
                <label>Product </label>
                <input value={filterText} placeholder="Select Product..." className="select-field" onChange={onFilterTextChange} />
                <input type="text" value={price} onChange={handlePriceChange} placeholder="Sales Price"></input>
                <button>Add Product</button>
            </form>

            
            </div>
        );
};
    

const selectedProductsTable = ({products, filterText} ) => {
    const rows = [];
    let lastproduct = null;

    products.forEach((product) => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase) !== -1) {
            return products.name;
        } else
           { return ;}
    });


        return (
            <div>
      
            </div>
        );
    };

    const ProductForm = () => {
        return <div>
            <SearchBar />
        </div>;
    };


export default ProductForm;
