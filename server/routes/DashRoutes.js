const express = require('express');
const router = express.Router();
//const { jwtAdminAuthMiddleware } = require('../middleware/jwtAdmin');
const jwtAdminAuthMiddleware = require('../middleware/jwtAdmin');
const crypto = require('crypto');

const Poster=require('../model/PosterSchema');
const Admin=require('../model/AdminSchema.js');
const User=require('../model/UserSchema');
const Query=require('../model/QuerySchema.js')
const Notification = require('../model/NotificationSchema.js'); // Import Notification model


console.log('jwtAdminAuthMiddleware:', jwtAdminAuthMiddleware);
console.log('Poster model:', Poster);


// UPLOAD A POSTER 
router.post('/uploadposter', async (req, res) => {
    console.log("From Upload route Everything :",req.body); // Log the incoming request body
    const { title, description, prices, posterImg, category, adminId } = req.body;

    // Validate incoming data
    if (!title || !description || !posterImg || !prices || !category || !adminId) {
        return res.status(400).json({ error: 'All fields, including category, are required!' });
    }

    // Check if category is valid
    const validCategories = [
        "technology",
        "marvel",
        "movies",
        "motivational",
        "nature",
        "sports",
        "games",
        "anime",
        "music",
        "celebrities",
        "custom",
    ];

    if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid category provided!' });
    }

    const newPoster = new Poster({
        title,
        description,
        prices,
        posterImg,
        category: category.toLowerCase(), // Store category in lowercase for consistency
        adminId,
    });

    try {
        await newPoster.save();
        res.status(201).json({ message: 'Poster uploaded successfully!' });
    } catch (err) {
        console.error('Error saving poster:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch Posters Route
// Fetch Posters with Pagination
router.get('/posters',async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query; // Extract query parameters with defaults

        const query = {};
        if (category) {
            query.category = category.toLowerCase(); // Match lowercase category for consistency
        }

        const posters = await Poster.find(query)
            .populate('adminId', 'name email') // Populate admin name and email
            .skip((page - 1) * limit) // Pagination: skip records
            .limit(parseInt(limit)); // Limit records per page

        const totalPosters = await Poster.countDocuments(query); // Count total documents

        res.status(200).json({
            posters,
            totalPages: Math.ceil(totalPosters / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.error('Error fetching posters:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to delete a poster
router.delete('/deleteposter/:posterId', async (req, res) => {
    const { posterId } = req.params;

    try {
        const deletedPoster = await Poster.findOneAndDelete({ posterId });

        if (!deletedPoster) {
            return res.status(404).json({ error: 'Poster not found!' });
        }

        res.status(200).json({ message: 'Poster deleted successfully!' });
    } catch (err) {
        console.error('Error deleting poster:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Fetch Users Route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .populate({
                path: 'orders',
                select: 'paymentStatus',
            })
            .select('username email profilePicture orders'); // Select specific fields for efficiency

        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a user
router.delete('/deleteuser/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedUser  = await User.findByIdAndDelete({_id});

        if (!deletedUser ) {
            return res.status(404).json({ error: 'User  not found!' });
        }

        res.status(200).json({ message: 'User  deleted successfully!' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Route to get unverified admins
router.get('/verify-admins', async (req, res) => {
    try {
        const unverifiedAdmins = await Admin.find({ isVerified: false });
        res.status(200).json(unverifiedAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unverified admins', error });
    }
});

// Route to verify an admin
router.post('/verify-admin/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByIdAndUpdate(id, { isVerified: true }, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin verified successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying admin', error });
    }
});

// Route to get current verified admins
router.get('/current-admins', async (req, res) => {
    try {
        const currentAdmins = await Admin.find({ isVerified: true });
        res.status(200).json(currentAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current admins', error });
    }
});

// Route to get current Unverified admins
router.get('/current-unadmins', async (req, res) => {
    try {
        const currentAdmins = await Admin.find({ isVerified: false });
        res.status(200).json(currentAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current admins', error });
    }
});

// Route to delete a current admin
router.delete('/current-admin/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
});

// GET: Get all queries (for admin)
router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        return res.status(200).json(queries);
    } catch (error) {
        console.error('Error fetching queries:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// PUT: Reply to a query
router.put('/queries/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { adminName, responseMessage } = req.body;

    try {
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        query.isResolved = true; // Mark as resolved
        query.response = {
            adminName,
            responseMessage,
            responseDate: new Date(),
        };

        await query.save();

        // Create a notification for the user
        const notification = new Notification({
            userId: query._id, // Assuming userId is stored in the query
            message: `Admin responded to your query: "${responseMessage}"`,
        });
        await notification.save();

        return res.status(200).json({ message: 'Query responded successfully', query });
    } catch (error) {
        console.error('Error responding to query:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
