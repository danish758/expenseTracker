const express = require("express");

const validateToken = require("../config/validateToken");
const {
  addTransaction,
  getAllTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", validateToken, addTransaction);

router.get("/", validateToken, getAllTransactions);

module.exports = router;
