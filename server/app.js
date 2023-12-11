const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/test.env" });
const User = require("./models/usermodel");
const ExternalApi = require("./models/ExternalApi");

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
  origin: "http://" + process.env.CORS_HOST + ":" + process.env.CORS_PORT,
  "Access-Control-Allow-Origin": "*",
  credentials: "true",
};

app.use(cors(corsOptions));

app.use(cors());

app.get("/api/users/getallusers", async (req, res) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

app.get("/api/externalapis", async (req, res) => {
  try {
    const name = req.query.name;
    const result = await ExternalApi.findOne({ name: name });
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send("Error retrieving data from the database");
  }
});

app.post("/api/externalapis", async (req, res) => {
  try {
    const newEntry = new ExternalApi({
      name: req.body.name,
      address: req.body.vicinity,
      rating: req.body.rating,
      totalUserRatings: req.body.user_ratings_total,
    });

    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    // res.status(500).send("Error saving data to the database");
    res.status(500).send(error);
    console.log(error);
  }
});

app.put("/api/externalapis", async (req, res) => {
  try {
    const { name } = req.body;
    const update = { ...req.body };

    const updatedEntry = await ExternalApi.findOneAndUpdate(
      { name: name },
      update,
      { new: true }
    );

    if (updatedEntry) {
      res.send(updatedEntry);
    } else {
      res.status(404).send("Entry not found");
    }
  } catch (error) {
    res.status(500).send("Error updating data in the database");
  }
});

app.use("/api/users", require("./routes/userroute"));
app.use("/api/order", require("./routes/orderroute"));
app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/gc", require("./routes/gcroute"));
app.get("*", (req, res) => {
  return res.status(404).send("Page Not Found");
});

module.exports = app;
