const mongoose = require("mongoose");

const externalApiSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    rating: Number,
    totalUserRatings: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExternalApi", externalApiSchema);
