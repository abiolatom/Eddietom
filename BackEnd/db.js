const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.DATABASE_URL;

let dbConnection;

module.exports = {
  connectToDb: async () => {
    try {
      await mongoose.connect(MONGO_URI);
      dbConnection = mongoose.connection;
      console.log("Connected to database"); // Log for confirmation
    } catch (err) {
      console.error(err);
      throw err; // Rethrow for handling elsewhere
    }
  },
  getDb: () => dbConnection,
};

/* module.exports = {
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
*/