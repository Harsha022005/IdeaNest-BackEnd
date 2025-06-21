import express from 'express';
import profilebio from '../models/profilebio.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { email } = req.query;
  // console.log(email)
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const profile = await profilebio.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    console.log(profile)
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});

export default router;

