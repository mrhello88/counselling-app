const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
      token: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
      },
});

module.exports = new mongoose.model("crypto",cryptoSchema)
