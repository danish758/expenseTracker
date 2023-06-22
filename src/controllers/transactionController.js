const asyncHandler = require("express-async-handler");
const Customers = require("../modals/customerModal");
const Transaction = require("../modals/transactionModal");

const addTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user || {};
    const { description, amount, transactionType, customerId } = req.body || {};
    if (!description || !amount || !transactionType || !customerId) {
      res.status(400).json({ message: "All fields are mandatory!" });
      return;
    }
    const customerFound = await Customers.findOne({
      _id: customerId,
      userId: id,
    });
    if (!customerFound) {
      res.status(400).json({ message: "No customer found!" });
      return;
    }
    const transaction = {
      description,
      amount,
      transactionType,
      customerId,
      userId: id,
    };
    const created = await Transaction.create(transaction);
    console.log("created", created);
    res.status(201).json({
      message: "Transaction completed!",
      transaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllTransactions = async (req, res) => {
  try {
    const { id } = req.user || {};
    const { customerId } = req.body || {};
    if (!customerId) {
      res.status(400).json({ message: "Please give customer id!" });
      return;
    }
    const customerFound = await Customers.findOne({
      _id: customerId,
      userId: id,
    });
    if (!customerFound) {
      res.status(400).json({ message: "No customer found!" });
      return;
    }
    const transactions = await Transaction.find({ customerId, userId: id });
    let totalGiven = 0,
      totalTaken = 0,
      totalAmount = 0,
      paymentStatus;
    transactions.map((transaction) => {
      if (transaction.transactionType == "given") {
        totalGiven = totalGiven + +transaction.amount;
      } else {
        totalTaken = totalTaken + +transaction.amount;
      }
    });
    if (totalGiven > totalTaken) {
      totalAmount = totalGiven - totalTaken;
      paymentStatus = "HaveMoneyToTake";
    } else {
      totalAmount = totalTaken - totalGiven;
      paymentStatus = "HaveLoan";
    }
    // console.log("total", totalAmount, paymentStatus);
    res.status(200).json({
      message: "Transactions fetched!",
      transactions,
      totalAmount,
      paymentStatus,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addTransaction, getAllTransactions };
