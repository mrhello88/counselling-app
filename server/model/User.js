const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Uname: String,
  email: String,
  role: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("User", UserSchema);
