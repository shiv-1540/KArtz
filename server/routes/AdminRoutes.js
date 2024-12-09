const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Admin = require('../model/AdminSchema');
// const db = require('../database/databaseSetup.js');

// Utility to generate JWT tokens
// const generateToken = (userData) => {
//     return jwt.sign(userData, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
// };

// Generate a new JWT token using user data
const generateToken = (userData) => {
    return jwt.sign(userData, "!@#$%^&*()", {expiresIn: 30000});
}

// User Signup Route
router.post('/adminsignup', async (req, res) => {
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
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new Admin({
            name, // Add this field
            username,
            email,
            password: hashedPassword,
            isVerified: false
        });
        

        const savedUser = await newUser.save();
        return res.status(201).json({ message: 'Admin registered successfully', user: { id: savedUser._id, username: savedUser.username, email: savedUser.email } });
    } catch (err) {
        console.error('Error during user registration:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// User Login Route
router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
       if (!admin.isVerified) {
         return res.status(403).json({ message: 'Account not verified. Please contact an admin.' });
      }
        // Generate a JWT token
        const token = generateToken({ id: admin._id, email: admin.email });

        return res.status(200).json({ message: 'Login successful', token, admin: { id: admin._id, username: admin.username, email: admin.email } });
    } catch (err) {
        console.error('Error during user login:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
