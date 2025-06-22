import express from 'express';
import Post from './models/UserpostsModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, description, image, tags, email } = req.body; 

  if (!title || !description || !tags || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newPost = new Post({ title, description, image, tags, email }); 
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
});

router.post('/delete', async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }
  try {
    const deleted = await Post.findByIdAndDelete(postId);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
});

router.post('/edit', async (req, res) => {
  const { postId, title, description, image, tags } = req.body;
  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }
  try {
    const updated = await Post.findByIdAndUpdate(
      postId,
      { title, description, image, tags },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully', post: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
});
export default router;
