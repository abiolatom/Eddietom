const { MongoClient } = require("mongodb");

require("dotenv").config();

const MONGO_URI = process.env.DATABASE_URL;
let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(MONGO_URI)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.error(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
