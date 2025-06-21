import express from 'express';
import Message from '../models/chat.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email missing' });

  try {
    const messages = await Message.find({
      $or: [{ sender: email }, { receiver: email }]
    });

    const users = new Set();

    messages.forEach((msg) => {
      if (msg.sender !== email) users.add(msg.sender);
      if (msg.receiver !== email) users.add(msg.receiver);
    });

    res.json([...users]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

export default router;
