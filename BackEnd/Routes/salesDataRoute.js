const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const salesReport = await generateSalesReport(db);
      res.json(salesReport);
    } catch (error) {
      console.error("Error generating sales report:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  async function generateSalesReport(db) {
    try {
      const combinedSalesData = await db.sales
        .aggregate([
          {
            $lookup: {
              from: "debtsales",
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
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ])
        .exec();

      return combinedSalesData;
    } catch (error) {
      throw error;
    }
  }

  return router;
};
