import React from "react";

const ProductForm = () => {
  return (
    <div>
      <h1>Product Form</h1>
      <form>
        <section>
          <label>Product Name</label>
          <input type="text" placeholder="product name" required />
        </section>
        <section>
          <label>Product Cost</label>
          <input type="text" placeholder="Cost Price" required />
        </section>
        <section>
          <label>Transport Cost</label>
          <input type="text" placeholder="Transport Price" required />
        </section>
        <section>
          <label>Purchase Quantity</label>
          <input type="text" placeholder="Product Quantity" required />
        </section>
        <section>
          <label>Purchase Date</label>
          <input type="date" placeholder="Cost Price" />
        </section>
        <section>
          <label>Delivery Date</label>
          <input type="date" placeholder="Cost Price" />
        </section>

        <div>
          {" "}
          <h4>Purchase Details</h4>
          <section>
            <label>Seller Name</label>
            <input type="text" placeholder='Seller Name"s' />
          </section>
          <section>
            <label>Seller's Address</label>
            <input type="text" placeholder='Seller"s Address' />
          </section>
          <section>
            <label>Payment Method</label>
            <input type="text" placeholder="Mode of Payment" />
          </section>
          <section>
            <label>Payment Date</label>
            <input type="date" />
          </section>
          <section>
            <label>Payment Installment</label>
            <input type="number" placeholder="Payment Installment" />
          </section>
          <section>
            <label>Second Installment Date</label>
            <input type="date" />
          </section>
          <section>
            <label>Payment Completion Date</label>
            <input type="date" />
          </section>
          <section>
            <label>Other Info</label>
            <input type="text" placeholder="Title" />
            <textarea type="text" placeholder="Title" />
          </section>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
