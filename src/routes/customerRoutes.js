const express = require("express");
const {
  addCustomer,
  getAllCustomers,
} = require("../controllers/customerController");
const validateToken = require("../config/validateToken");

const router = express.Router();

router.post("/add", validateToken, addCustomer);

router.get("/", validateToken, getAllCustomers);

module.exports = router;
