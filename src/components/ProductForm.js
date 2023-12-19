import { useState, useEffect } from "react";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    unitCost: "",
    quantity: "",
    transportCost: "",
    totalCost: "",
    purchaseDate: "",
    deliveryDate: "",
    sellerName: "",
    sellerAddress: "",
    paymentMethod: "",
    paymentDate: "",
    paymentInstallment: {
      howMany: 1,
      amount: "",
      secondInstallmentDate: "",
      secondAmount: "",
      paymentCompletionDate: "",
    },

    otherInfo: "",
    timestamps:""
  });

  const [calculatedTotalCost, setCalculatedTotalCost] = useState(0);

  useEffect(() => {
    // Recalculate total cost whenever unitCost, quantity, or transportCost changes
    const unitCost = parseFloat(productData.unitCost) || 0;
    const quantity = parseFloat(productData.quantity) || 0;
    const transportCost = parseFloat(productData.transportCost) || 0;

    const newTotalCost = unitCost * quantity + transportCost;
    setProductData((prevData) => ({
      ...prevData,
      totalCost: newTotalCost,
    }));
    setCalculatedTotalCost(newTotalCost);
  }, [productData.unitCost, productData.quantity, productData.transportCost]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("paymentInstallment")) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product added successfully");
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h3>Cost Details</h3>
          </legend>
          <section>
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              name="productName"
              type="text"
              value={productData.productName}
              onChange={handleChange}
              placeholder="Product name"
              required
            />
          </section>
          <section>
            <label htmlFor="category">Product Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={productData.category}
              onChange={handleChange}
              placeholder="Product Category"
              required
            />
          </section>
          <section>
            <label htmlFor="unitCost">Product Cost</label>
            <input
              id="unitCost"
              name="unitCost"
              type="number"
              value={productData.unitCost}
              onChange={handleChange}
              placeholder="Cost Price"
              required
            />
          </section>
          <section>
            <label htmlFor="quantity">Purchase Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleChange}
              placeholder="Product Quantity"
              required
            />
          </section>
          <section>
            <label htmlFor="transportCost">Transport Cost</label>
            <input
              id="transportCost"
              name="transportCost"
              type="number"
              value={productData.transportCost}
              onChange={handleChange}
              placeholder="Transport Price"
              required
            />
          </section>

          <section>
            <label htmlFor="totalCost">Total Cost</label>
            <input
              id="totalCost"
              name="totalCost"
              type="text"
              value={calculatedTotalCost.toFixed(2)}
              onChange={handleChange}
              placeholder="Total Cost"
              readOnly
              disabled
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
            <input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              value={productData.purchaseDate}
              onChange={handleChange}
              placeholder="Cost Price"
            />
          </section>
          <section>
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input
              id="deliveryDate"
              name="deliveryDate"
              value={productData.deliveryDate}
              onChange={handleChange}
              type="date"
              placeholder="Cost Price"
            />
          </section>

          <section>
            <label htmlFor="sellerName">Seller Name</label>
            <input
              id="sellerName"
              name="sellerName"
              type="text"
              value={productData.sellerName}
              onChange={handleChange}
              placeholder='Seller Name"s'
            />
          </section>
          <section>
            <label htmlFor="sellerAddress">Seller's Address</label>
            <input
              id="sellerAddress"
              name="sellerAddress"
              value={productData.sellerAddress}
              onChange={handleChange}
              type="text"
              placeholder='Seller"s Address'
            />
          </section>
          <section>
            <label htmlFor="paymentMethod">Payment Method</label>
            <input
              id="paymentMethod"
              name="paymentMethod"
              type="text"
              value={productData.paymentMethod}
              onChange={handleChange}
              placeholder="Mode of Payment"
            />
          </section>
          <section>
            <label htmlFor="paymentDate">Payment Date</label>
            <input
              id="paymentDate"
              value={productData.paymentDate}
              onChange={handleChange}
              name="paymentDate"
              type="date"
            />
          </section>

          <section>
            <label htmlFor="paymentInstallment">Payment Installment</label>

            <section>
              <label htmlFor="paymentInstallment.howMany">
                Number of Installments
              </label>
              <input
                type="number"
                name="paymentInstallment.howMany"
                id="howMany"
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
                id="amount"
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
                id="secondInstallmentDate"
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
                id="secondAmount"
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
                id="paymentCompletionDate"
                name="paymentInstallment.paymentCompletionDate"
                value={productData.paymentInstallment.paymentCompletionDate}
                onChange={handleChange}
              />
            </section>
          </section>
          <section>
            <label htmlFor="otherInfo">Other Info</label>
            <textarea
              id="otherInfo"
              name="otherInfo"
              type="text"
              placeholder="Any other Info?"
              value={productData.otherInfo}
              onChange={handleChange}
            />
          </section>
        </fieldset>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
