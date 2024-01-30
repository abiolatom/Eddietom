const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.DATABASE_URL;

let dbConnection;

module.exports = {
  connectToDb: async () => {
    try {
      await mongoose.connect(MONGO_URI);
      dbConnection = mongoose.connection;
      console.log("Connected to database"); 
    } catch (err) {
      console.error(err);
      throw err; 
    }
  },
  getDb: () => dbConnection,
};
