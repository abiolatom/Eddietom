import React from "react";

const ProductDetails = () => {
  return (
    <div>
      <h3> Purchase Details</h3>
      <form>
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

        <button type="submit">Submit Details</button>
      </form>
    </div>
  );
};

export default ProductDetails;
