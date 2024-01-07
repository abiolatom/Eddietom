const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/salesReport", async (req, res) => {
    try {
      const salesReport = await generateSalesReport();
      res.json(salesReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  async function generateSalesReport() {
    const salesReport = await db.sales.aggregate([
      {
        $lookup: {
          from: "salesDeposit",
          localField: "_id",
          foreignField: "salesId",
          as: "salesDepositData",
        },
      },
      {
        $lookup: {
          from: "Debtsales",
          localField: "_id",
          foreignField: "salesId",
          as: "debtSalesData",
        },
      },
      {
        $unwind: "$selectedProducts",
      },
      {
        $group: {
          _id: {
            date: "$timestamp",
            productName: "$selectedProducts.productName",
          },
          totalQuantity: { $sum: "$selectedProducts.quantity" },
          totalPrice: { $sum: "$selectedProducts.subtotal" },
          totalPayment: { $sum: "$totalPayment" },
          // paymentStatus: { $first: "$amounts" }, // Modify this based on your payment status logic
          // pickupStatus: { $first: "$pickupStatus" }, // Modify this based on your pick-up status logic
        },
      },
      {
        $group: {
          _id: "$_id.date",
          totalSales: { $sum: "$totalPrice" },
          products: {
            $push: {
              productName: "$_id.productName",
              totalQuantity: "$totalQuantity",
              totalPrice: "$totalPrice",
            },
          },
          totalPayment: { $sum: "$totalPayment" },
          // paymentStatus: { $first: "$paymentStatus" },
          // pickupStatus: { $first: "$pickupStatus" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return salesReport;
  }

  return router;
};
