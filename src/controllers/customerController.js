const asyncHandler = require("express-async-handler");
const Customers = require("../modals/customerModal");

const addCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user || {};
    const { phone, email, name } = req.body || {};
    if (!phone || !email || !name) {
      res.status(400).json({ message: "All fields are mandatory!" });
    }
    const phoneTaken = await Customers.findOne({
      phone,
      userId: id,
      email,
    });
    if (phoneTaken) {
      res.status(400).json({ message: "Phone number already taken!" });
    }
    if (!id) {
      res.status(400).json({ message: "User not found!" });
    }
    const customer = {
      phone,
      email,
      name,
      userId: id,
    };
    const created = await Customers.create(customer);
    res
      .status(201)
      .json({ message: "Customer has been created successfully!", customer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllCustomers = async (req, res) => {
  try {
    const { id } = req.user || {};
    const allCustomers = await Customers.find({ userId: id });
    res
      .status(200)
      .json({ message: "Customers fetched!", customers: allCustomers });
    console.log("user", id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addCustomer, getAllCustomers };
