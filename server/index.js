require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const mongoose = require("mongoose");
const router = require("./routes/productroute");
const route = require("./routes/userRoute");
const cors = require("cors");
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("the db is running successfully"))
  .catch((err) => console.log(err));
app.use("/", router);
app.use("/", route);

app.listen(port, () => {
  console.log("server is running on port", port);
});
