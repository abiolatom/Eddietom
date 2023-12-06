const dummyProduct = {
  productName: "Dummy Laptop",
  category: "Electronics",
  unitCost: 800,
  quantity: 10,
  transportCost: 50,
  totalCost: 8050,
  purchaseDate: new Date("2023-01-15"),
  deliveryDate: new Date("2023-02-01"),
  sellerName: "ElectroTech Store",
  sellerAddress: "123 Tech Street, Tech City",
  paymentMethod: "Credit Card",
  paymentDate: new Date("2023-02-01"),
  paymentInstallment: [
    {
      howMany: 2,
      amount: 4025,
      secondInstallmentDate: new Date("2023-03-01"),
      secondAmount: 4025,
      paymentCompletionDate: new Date("2023-03-15"),
    },
  ],
  Other_Info: "This is a dummy product for testing purposes.",
};
