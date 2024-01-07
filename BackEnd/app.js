const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectToDb, getDb } = require("./db");

const productRoute = require("./Routes/productRoute");
const expenseRoute = require("./Routes/expenseRoute");
const salesRoute = require("./Routes/salesRoute");
const debtSalesRoute = require("./Routes/debtSalesRoute");
const customerRoute = require("./Routes/customerRoute");
const incomesRoute = require("./Routes/incomesRoute");
const salesDataRoute = require("./Routes/salesDataRoute");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
  try {
    await connectToDb();
    const db = getDb();
    // console.log(db);

    app.use("/products", productRoute(db));
    app.use("/expenses", expenseRoute(db));
    app.use("/incomes", incomesRoute(db));
    app.use("/sales", salesRoute(db));
    app.use("/debtsales", debtSalesRoute(db));
    app.use("/customerdata", customerRoute(db));
    app.use("/salesdata", salesDataRoute(db));
  } catch (err) {
    console.error(err);
  }
});


module.exports = app;
