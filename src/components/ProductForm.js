import React, { useState } from "react";

const products = [
  { id: 12, name: "shopping", cost: 40 },
  { id: 13, name: "holiday", cost: 400 },
  { id: 14, name: "car service", cost: 50 },
];

const SearchBar = () => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [price, setPrice] = useState();

    const handleSelectedProductChange = (e) => {
        setSelectedProduct(e.target.value);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setPrice(value);
        }
    };
    return (
            <div>
            <form>
                <label>Product </label>
                <input value={selectedProduct} placeholder="Select Product..." className="select-field" onChange={handleSelectedProductChange} />
                <input type="text" value={price} onChange={handlePriceChange} placeholder="Sales Price"></input>
                <button>Add Product</button>
            </form>

            <p>{selectedProduct }</p>
            </div>
        );
};
    

    const selectedProductsTable = () => {
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
