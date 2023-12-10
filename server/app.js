const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/test.env" });
const User = require("./models/usermodel");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());

var corsOptions = {
  origin: process.env.CORS_HOST,
  "Access-Control-Allow-Origin": "*",
  credentials: "true",
};

app.use(cors(corsOptions));

app.use(cors());

app.get("/api/users/getallusers", async (req, res) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

app.use("/api/users", require("./routes/userroute"));
app.use("/api/order", require("./routes/orderroute"));
app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/gc", require("./routes/gcroute"));
app.get("*", (req, res) => {
  return res.status(404).send("Page Not Found");
});

module.exports = app;
