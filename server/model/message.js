const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    // validate: [
    //   {
    //     validator: (value) => value.length > 0,
    //     message: "Message cannot be empty",
    //   },
    //   // {
    //   //   validator: (value) => /^[a-zA-Z0-9\s]*$/.test(value),
    //   //   message: "Message can only contain Alphanumeric characters and spaces",
    //   // },
    // ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
    timestamps:true
});
module.exports = mongoose.model("Message", messageSchema)
