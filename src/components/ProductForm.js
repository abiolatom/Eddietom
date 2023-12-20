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
    timestamps: "",
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
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Product Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="border p-4">
          <legend className="text-lg font-semibold">
            <h3>Cost Details</h3>
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="productName"
                className="text-sm font-semibold mb-1"
              >
                Product Name
              </label>
              <input
                className="w-full border p-2 rounded-md"
                id="productName"
                name="productName"
                type="text"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Product name"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="category" className="text-sm font-semibold mb-1">
                Product Category
              </label>
              <input
                className="w-full border p-2 rounded-md"
                id="category"
                name="category"
                type="text"
                value={productData.category}
                onChange={handleChange}
                placeholder="Product Category"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="unitCost" className="text-sm font-semibold mb-1">
                Product Cost
              </label>
              <input
                id="unitCost"
                name="unitCost"
                type="number"
                value={productData.unitCost}
                onChange={handleChange}
                placeholder="Cost Price"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="quantity" className="text-sm font-semibold mb-1">
                Purchase Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={productData.quantity}
                onChange={handleChange}
                placeholder="Product Quantity"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="transportCost"
                className="text-sm font-semibold mb-1"
              >
                Transport Cost
              </label>
              <input
                id="transportCost"
                name="transportCost"
                type="number"
                value={productData.transportCost}
                onChange={handleChange}
                placeholder="Transport Price"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="totalCost" className="text-sm font-semibold mb-1">
                Total Cost
              </label>
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
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4">
          <legend className="text-lg font-semibold">Purchase Details</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="purchaseDate"
              >
                Purchase Date
              </label>
              <input
                id="purchaseDate"
                name="purchaseDate"
                type="date"
                value={productData.purchaseDate}
                onChange={handleChange}
                placeholder="Cost Price"
                className="w-full border p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="deliveryDate"
              >
                Delivery Date
              </label>
              <input
                id="deliveryDate"
                name="deliveryDate"
                value={productData.deliveryDate}
                onChange={handleChange}
                type="date"
                placeholder="Cost Price"
                className="w-full border p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="sellerName"
              >
                Seller Name
              </label>
              <input
                id="sellerName"
                name="sellerName"
                type="text"
                value={productData.sellerName}
                onChange={handleChange}
                placeholder='Seller Name"s'
                className="w-full border p-2"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="sellerAddress"
              >
                Seller's Address
              </label>
              <input
                id="sellerAddress"
                name="sellerAddress"
                value={productData.sellerAddress}
                onChange={handleChange}
                type="text"
                placeholder='Seller"s Address'
                className="w-full border p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentMethod"
              >
                Payment Method
              </label>
              <input
                id="paymentMethod"
                name="paymentMethod"
                type="text"
                value={productData.paymentMethod}
                onChange={handleChange}
                placeholder="Mode of Payment"
                className="w-full border p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentDate"
              >
                Payment Date
              </label>
              <input
                id="paymentDate"
                value={productData.paymentDate}
                onChange={handleChange}
                name="paymentDate"
                type="date"
                className="w-full border p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentInstallment.howMany"
              >
                Number of Installments
              </label>
              <input
                type="number"
                name="paymentInstallment.howMany"
                id="howMany"
                value={productData.paymentInstallment.howMany}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentInstallment.amount"
              >
                First Installment Amount
              </label>
              <input
                type="number"
                id="amount"
                name="paymentInstallment.amount"
                value={productData.paymentInstallment.amount}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentInstallment.secondInstallmentDate"
              >
                Second Installment Date
              </label>
              <input
                type="date"
                id="secondInstallmentDate"
                name="paymentInstallment.secondInstallmentDate"
                value={productData.paymentInstallment.secondInstallmentDate}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentInstallment.secondAmount"
              >
                Second Installment Amount
              </label>
              <input
                type="number"
                id="secondAmount"
                name="paymentInstallment.secondAmount"
                value={productData.paymentInstallment.secondAmount}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="paymentInstallment.paymentCompletionDate"
              >
                Payment Completion Date
              </label>
              <input
                type="date"
                id="paymentCompletionDate"
                name="paymentInstallment.paymentCompletionDate"
                value={productData.paymentInstallment.paymentCompletionDate}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold"
                htmlFor="otherInfo"
              >
                Other Info
              </label>
              <textarea
                id="otherInfo"
                name="otherInfo"
                type="text"
                placeholder="Any other Info?"
                value={productData.otherInfo}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
