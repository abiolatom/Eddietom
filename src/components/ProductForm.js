import { useState } from "react";
import { productTemplate } from "../utils/products";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    productTemplate,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // If the field is part of paymentInstallment, update it accordingly
    if (name.startsWith("paymentInstallment.")) {
      const paymentField = name.split(".")[1];
      setProductData((prevData) => ({
        ...prevData,
        paymentInstallment: {
          ...prevData.paymentInstallment,
          [paymentField]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., calling an API
  };
  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Product Cost</legend>
          <section>
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              placeholder="Product name"
              required
            />
          </section>
          <section>
            <label htmlFor="category">Product Category</label>
            <input
              id="category"
              type="text"
              placeholder="Product Category"
              required
            />
          </section>
          <section>
            <label htmlFor="unitCost">Product Cost</label>
            <input
              id="unitCost"
              type="text"
              placeholder="Cost Price"
              required
            />
          </section>
          <section>
            <label htmlFor="quantity">Purchase Quantity</label>
            <input
              id="quantity"
              type="text"
              placeholder="Product Quantity"
              required
            />
          </section>
          <section>
            <label htmlFor="transportCost">Transport Cost</label>
            <input
              id="transportCost"
              type="text"
              placeholder="Transport Price"
              required
            />
          </section>

          <section>
            <label htmlFor="totalCost">Total Cost</label>
            <input
              id="totalCost"
              type="text"
              placeholder="Total Cost"
              required
            />
          </section>
        </fieldset>

        <fieldset>
          <legend>
            <h4>Purchase Details</h4>
          </legend>
          <section>
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input id="purchaseDate" type="date" placeholder="Cost Price" />
          </section>
          <section>
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input id="deliveryDate" type="date" placeholder="Cost Price" />
          </section>

          <section>
            <label htmlFor="sellerName">Seller Name</label>
            <input id="sellerName" type="text" placeholder='Seller Name"s' />
          </section>
          <section>
            <label htmlFor="sellerAddress">Seller's Address</label>
            <input
              id="sellerAddress"
              type="text"
              placeholder='Seller"s Address'
            />
          </section>
          <section>
            <label htmlFor="paymentMethod">Payment Method</label>
            <input
              id="paymentMethod"
              type="text"
              placeholder="Mode of Payment"
            />
          </section>
          <section>
            <label htmlFor="paymentDate">Payment Date</label>
            <input id="paymentDate" type="date" />
          </section>

          <section>
            <label htmlFor="paymentInstallment">Payment Installment</label>
            <input
              id="paymentInstallment"
              type="number"
              placeholder="Payment Installment"
            />
          </section>

          <section>
            <label htmlFor="paymentInstallment.howMany">
              Number of Installments
            </label>
            <input
              type="number"
              id="paymentInstallment.howMany"
              name="paymentInstallment.howMany"
              value={productData.paymentInstallment.howMany}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="paymentInstallment.amount">
              First Installment Amount
            </label>
            <input
              type="number"
              id="paymentInstallment.amount"
              name="paymentInstallment.amount"
              value={productData.paymentInstallment.amount}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="paymentInstallment.secondInstallmentDate">
              Second Installment Date
            </label>
            <input
              type="date"
              id="paymentInstallment.secondInstallmentDate"
              name="paymentInstallment.secondInstallmentDate"
              value={productData.paymentInstallment.secondInstallmentDate}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="paymentInstallment.secondAmount">
              Second Installment Amount
            </label>
            <input
              type="number"
              id="paymentInstallment.secondAmount"
              name="paymentInstallment.secondAmount"
              value={productData.paymentInstallment.secondAmount}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="paymentInstallment.paymentCompletionDate">
              Payment Completion Date
            </label>
            <input
              type="date"
              id="paymentInstallment.paymentCompletionDate"
              name="paymentInstallment.paymentCompletionDate"
              value={productData.paymentInstallment.paymentCompletionDate}
              onChange={handleChange}
            />
          </section>

          <section>
            <label htmlFor="otherInfo">Other Info</label>
            <textarea
              id="otherInfo"
              type="text"
              placeholder="Any other Info?"
            />
          </section>
        </fieldset>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
