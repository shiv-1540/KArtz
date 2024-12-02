const jwt = require('jsonwebtoken');

// Middleware to validate JWT tokens
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '89662b112baf1198e387f04d5a3f2b81bfd9b2f81820f58d880617c0fa000559afe98b42ff4ca057277cb1cac1bb7763c30b766b07d3d144c5dc8a20611746001d56bf8bbf46e9a6e21ab0f839a04f5003dea0b6b87302d3b10ca95dac5fe9b3c273c92adbd5a020e4c713210c02165cc069fc376d223f5a7ba2932f82b144b7acd72de4d9c74454684ec4e38b5aae916cd8ccd35d9ad6221c2b6a5eb9f15101');
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Utility to generate a new JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET || '89662b112baf1198e387f04d5a3f2b81bfd9b2f81820f58d880617c0fa000559afe98b42ff4ca057277cb1cac1bb7763c30b766b07d3d144c5dc8a20611746001d56bf8bbf46e9a6e21ab0f839a04f5003dea0b6b87302d3b10ca95dac5fe9b3c273c92adbd5a020e4c713210c02165cc069fc376d223f5a7ba2932f82b144b7acd72de4d9c74454684ec4e38b5aae916cd8ccd35d9ad6221c2b6a5eb9f15101', { expiresIn: '1h' });
};

module.exports = { jwtAuthMiddleware, generateToken };
