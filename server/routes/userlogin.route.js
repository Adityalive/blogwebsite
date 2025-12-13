import express from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js';
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new User({
             username,
             password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const secret =process.env.JWT_SECRET

    console.log('Login attempt for:', req.body.username);
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        console.log('Finding user');
        const user = await User.findOne({ username });
        console.log('User found:', !!user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Comparing password');
        const isPasswordValid = await compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Generating token');
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24h' });
        console.log('Sending response');
        res.json({ message: 'Login successful', user: { username: user.username }, token });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;

