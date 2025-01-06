const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Publisher = require('../model/PublisherSchema');
const db = require('../database/databaseSetup');

// Utility to generate JWT tokens
// const generateToken = (userData) => {
//     return jwt.sign(userData, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
// };

// Generate a new JWT token using user data
const generateToken = (userData) => {
    return jwt.sign(userData, "!@#$%^&*()", {expiresIn: 30000});
}

// User Signup Route
router.post('/pubsignup', async (req, res) => {
    console.log("Signup route hit with data:", req.body);
    const {name, username, email, password, confirmPassword } = req.body;

    if (!name ||!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await Publisher.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newPublisher = new Publisher({
            name, // Add this field
            username,
            email,
            password: hashedPassword,
        });
        

        const savedPublisher = await newPublisher.save();
        return res.status(201).json({ message: 'User registered successfully', publisher: { id: savedPublisher._id, username: savedPublisher.username, email: savedPublisher.email } });
    } catch (err) {
        console.error('Error during user registration:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// User Login Route
router.post('/publogin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const publisher = await Publisher.findOne({ email });
        if (!publisher) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, publisher.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = generateToken({ id: publisher._id, email: publisher.email });
        console.log("From login route : ",publisher.profilePicture.url)
        return res.status(200).json({ message: 'Login successful', token, publisher: { id: publisher._id, username: publisher.username, email: publisher.email ,profileImage:publisher.profilePicture.url} });
    } catch (err) {
        console.error('Error during user login:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
