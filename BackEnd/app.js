const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");
const productRoute = require("./Routes/productRoute");
const expenseRoute = require("./Routes/expenseRoute");
const salesRoute = require("./Routes/salesRoute");
const cors = require("cors");
const debtSalesRoute = require("./Routes/debtSalesRoute");
const app = express();

app.use(express.json());
app.use(cors());

connectToDb((err) => {
  if (!err) {
    const db = getDb();

    app.use("/products", productRoute(db));
    app.use("/expenses", expenseRoute(db));
    app.use("/sales", salesRoute(db));
    app.use("/debtsales", debtSalesRoute(db));

    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
      console.log("Connected to database");
    });
  }
});

module.exports = app;
