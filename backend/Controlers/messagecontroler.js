import Message from "../Models/message.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res
      .status(200)
      .json({ message: "Messages retrieved successfully", messages });
  } catch (error) {
    res.status(404).json({ message: "Error retrieving messages" });
  }
};

export const postMessage = async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    const newMessage = new Message({
      fullName,
      email,
      message,
    });

    await newMessage.save();

    res
      .status(201)
      .json({ message: "Message posted successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error posting the message", error });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the message", error });
  }
};
