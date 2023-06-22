const mongoose = require("mongoose");
const { MONGO_URL } = require("./env");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL, {
      dbName: "expenseTracker",
    });
    console.log(
      "Database connected ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
