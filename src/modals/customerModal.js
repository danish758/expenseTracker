const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customers", customerSchema);
