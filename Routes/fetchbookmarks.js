import express from 'express';
import User from '../models/user.js';

const router = express.Router();
router.get('/fetch', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email }).populate('bookmarks'); // we can get bookmarks of post_id,title,images,description etc.....
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
