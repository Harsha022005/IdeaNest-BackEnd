import express from 'express';
import { Signup, login } from './authcontroller.js';
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);

export default router;