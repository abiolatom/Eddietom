const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.DATABASE_URL;

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        dbConnection = mongoose.connection;
        return cb();
      })
      .catch((err) => {
        console.error(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
