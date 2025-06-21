import express from 'express';
import Post from '../models/UserpostsModel.js';

const router = express.Router();
//Fetch all posts
router.get('/', async (req, res) => {
  try {
    const response = await Post.find({}).sort({ createdAt: -1 });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch uer's submitted posts to dashboard
router.get('/fetch', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const posts = await Post.find({ email }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Liked posts
router.put('/like/:id', async (req, res) => {
  const userEmail = req.body.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email required to like a post" });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likedBy.includes(userEmail)) {
      return res.status(400).json({ error: "User already liked this post" });
    }

    post.likes += 1;
    post.likedBy.push(userEmail);
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

export default router;
