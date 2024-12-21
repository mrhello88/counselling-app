const MessageSchema = require("../model/message.js");
const Conversation = require("../model/conversation");

exports.postMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { message, createdAt } = req.body;

    // Access uploaded file paths if they exist
    const image = req.files?.chatImage?.[0]?.path.split("\\chat\\")[1]; // Full path for image
    const file = req.files?.chatFile?.[0]?.path.split("\\chat\\")[1]; // Full path for file

    // Create conversation if it doesn't exist
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message schema
    const newMessage = new MessageSchema({
      senderId: senderId,
      receiverId: receiverId,
      message: message.trim(),
      image, // Attach image path if it exists
      file, // Attach file path if it exists
      createdAt,
    });

    // Save the new message to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // Save the message to the database
    await newMessage.save();

    return res.status(201).json({
      message: "Message added to conversation successfully",
      data: newMessage,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while posting messages", success: false });
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
