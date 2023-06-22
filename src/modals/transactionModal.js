const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please add the user name"],
    },
    amount: {
      type: String,
      required: [true, "Please add amount!"],
    },
    transactionType: {
      type: String,
      required: [true, "Please give transaction type!"],
    },
    customerId: { type: Schema.Types.ObjectId, ref: "Customers" },
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", transactionSchema);
