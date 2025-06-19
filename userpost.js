import express from 'express';
import mongoose from 'mongoose';
import Post from './models/UserpostsModel.js'
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description, image, tags } = req.body;
    try {
        const newPost = new Post({ title, description, image, tags });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err.message);
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
});

export default router;
