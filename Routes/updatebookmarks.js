import express from 'express';
import User from '../models/user.js';
const router = express.Router();

router.post('/add', async (req, res) => {
  const { email, postId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.bookmarks.indexOf(postId);

    if (index === -1) {
      user.bookmarks.push(postId);
      await user.save();
      return res.status(200).json({ message: "Post bookmarked" });
    } else {
      user.bookmarks.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: "Bookmark removed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/delete',async(req,res)=>{
  
})
// remove bookmarks

router.post('/remove', async (req, res) => {
  const { email, postId } = req.body;

  if (!email || !postId) {
    return res.status(400).json({ message: 'Email and Post ID are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.bookmarks = user.bookmarks.filter(
      (bookmarkId) => bookmarkId.toString() !== postId
    );

    await user.save();

    res.status(200).json({ message: 'Bookmark removed successfully', bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove bookmark' });
  }
});

export default router;

