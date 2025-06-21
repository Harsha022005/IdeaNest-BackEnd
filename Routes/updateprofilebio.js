import express from 'express';
import profilebio from '../models/profilebio.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const {name, email, bio } = req.body;
  console.log('updating: ',{name,email,bio})

  if (!email || !name || !bio) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if profile already exists
    const existing = await profilebio.findOne({ email });

    if (existing) {
      // Update existing profile
      existing.name = name;
      existing.bio = bio;
      await existing.save();
      return res.status(200).json({ message: 'Profile updated', profile: existing });
    }

    // Create new profile
    const newProfile = new profilebio({ name, email, bio });
    await newProfile.save();
    res.status(201).json({ message: 'Profile created', profile: newProfile });

  } catch (err) {
    res.status(500).json({ message: 'Error saving profile', error: err.message });
  }
});

export default router;



