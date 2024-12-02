const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const cloudinary=require('./cloudinary');


const port = process.env.PORT || 3000;
// Import routes
const userAuthen = require('./routes/AuthenRoutes');
const adminAuthen = require('./routes/AdminRoutes');
const adminDash=require('./routes/DashRoutes');
const userRoute=require('./routes/UserRoutes');

const app = express();

// Middlewares
app.use(express.json(
    {
        limit:"20mb",
    }
));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));





// Routes
app.use('/userAuthen', userAuthen); // Ensure this matches frontend
app.use('/adminAuthen', adminAuthen);
app.use('/admindash',adminDash);
app.use('/userdash',userRoute);


app.post('/upload', async (req, res, next) => { // Corrected syntax
    try {
        const image_url = req.body.image_url;

        const cloudinary_res = await cloudinary.uploader.upload(image_url, {
            folder: 'posters',
        });

        console.log(cloudinary_res);
        res.status(200).json({
            message: 'Image uploaded successfully',
            public_id: cloudinary_res.public_id,
            secure_url: cloudinary_res.secure_url,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Image upload failed', error });
    }
});

app.post('/uploadprofimg', async (req, res) => {
    try {
        const image_url = req.body.image_url;

        const cloudinary_res = await cloudinary.uploader.upload(image_url, {
            folder: 'profileimgs',
        });

        res.status(200).json({
            message: 'Image uploaded successfully',
            public_id: cloudinary_res.public_id,
            secure_url: cloudinary_res.secure_url,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Image upload failed', error });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
