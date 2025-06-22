import User from "./models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Error in registration:', err.message);
        return res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User does not have an account' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        if (role && existingUser.role !== role) {
            return res.status(400).json({ message: 'Selected role does not match user role' });
        }

        const token = jwt.sign(
            { email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

return res.status(200).json({ message: 'Login successful', token, role: existingUser.role, email: existingUser.email });
    } catch (err) {
        console.error('Error in login:', err.message);
        return res.status(500).json({ message: err.message });
    }
};