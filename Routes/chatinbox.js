import express from "express";
import Message from "../models/chat.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email missing" });

  try {
    // Fetch messages where the user is either sender or receiver, sorted by latest timestamp
    const messages = await Message.find({
      $or: [
        { sender: email, sender: { $ne: null } },
        { receiver: email, receiver: { $ne: null } }
      ]
    }).sort({ timestamp: -1 });

    console.log("Fetched messages:", messages);

    const usersSet = new Set();

    messages.forEach((msg) => {
      if (msg.sender && msg.sender !== email) usersSet.add(msg.sender);
      if (msg.receiver && msg.receiver !== email) usersSet.add(msg.receiver);
    });

    const users = Array.from(usersSet);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get conversations" });
  }
});

export default router;
