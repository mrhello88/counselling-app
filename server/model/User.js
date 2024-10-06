const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  personalInfo: {
    type: Object,
    required: true,
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  education: {
    type: Object,
    degree: {
      type: String,
    },
    institution: { type: String },
    experience: { type: String },
    description: { type: String },
  },
  payment: {
    type: Object,
    accountNumber: { type: String },
    bankName: { type: String },
    branchCode: { type: String },
  },
  role: { type: String, required: true },
  file: { type: String},
  profile:{type:String},
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{ timestamps: true });

module.exports = mongoose.model("User", UserSchema);
