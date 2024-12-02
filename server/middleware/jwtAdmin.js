const jwt = require('jsonwebtoken');
const Admin = require('../model/AdminSchema'); // Assuming Admin model exists

const jwtAdminAuthMiddleware = async (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token format
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET||'89662b112baf1198e387f04d5a3f2b81bfd9b2f81820f58d880617c0fa000559afe98b42ff4ca057277cb1cac1bb7763c30b766b07d3d144c5dc8a20611746001d56bf8bbf46e9a6e21ab0f839a04f5003dea0b6b87302d3b10ca95dac5fe9b3c273c92adbd5a020e4c713210c02165cc069fc376d223f5a7ba2932f82b144b7acd72de4d9c74454684ec4e38b5aae916cd8ccd35d9ad6221c2b6a5eb9f15101'); // Replace with your secret
        
        const admin = await Admin.findById(decoded.id);
        console.log("Admin :::: ",admin);
        if (!admin) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        req.user = { id: admin._id }; // Attach admin info to request
        next();
    } catch (err) {
        console.error('Error in JWT middleware:', err);
        res.status(403).json({ error: 'Token is invalid or expired' });
    }
};

module.exports = jwtAdminAuthMiddleware;
