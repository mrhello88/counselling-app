const MessageSchema = require("../model/message.js");
const Conversation = require("../model/conversation");

exports.postMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { message } = req.body;
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
    }
    await Promise.all([newMessage.save()]);
    return res.status(201).json({
      message: "message add to conversation successfully",
      data: newMessage,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error post messages", success: true });
  }
};

exports.postGetMessages = async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res
        .status(404)
        .json({ data: [], success: true, message: "conversion is not exist" });
    }
    return res.status(201).json({
      message: "fetch all messages from conversation",
      data: conversation.messages,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error fetch messages", success: false });
  }
};
      