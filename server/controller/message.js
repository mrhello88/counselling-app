const MessageSchema = require("../model/message.js");
const Conversation = require("../model/conversation");

exports.postMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { message } = req.body;
    console.log(senderId, receiverId, message, "data from postmessages");
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new MessageSchema({
      senderId: senderId,
      receiverId: receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.save(); 
      console.log(conversation, "conversations");
    } 
    await Promise.all([newMessage.save()]);
    res.status(201).json({
      message: "message add to conversation successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "server error post messages" });
  }
};

exports.postGetMessages = async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params
    console.log("req.boyd", receiverId, senderId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res
      .status(201)
      .json({
        message: "fetch all messages from conversation",
        chat: conversation.messages,
      });
  } catch (error) {
    res.status(500).json({ message: "server error fetch messages" });
  }
};
