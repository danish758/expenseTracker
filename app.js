require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./src/config/connection");
const { PORT } = require("./src/config/env");
app.use(express.json());
connectDb();
app.use(cors());

app.use("/users", require("./src/routes/userRoutes"));
app.use("/customers", require("./src/routes/customerRoutes"));
app.use("/transactions", require("./src/routes/transactionRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
