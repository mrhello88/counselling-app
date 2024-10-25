const mongoose = require("mongoose");

const createCounselingSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    duration: {
      type: Number,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("createCounseling", createCounselingSchema);
