const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const Razorpay = require('razorpay');

const cloudinary=require('./cloudinary');

const razorpay = new Razorpay({
    key_id: 'rzp_test_wTfvWCIKXITjBZ',
    key_secret: 'eTM4b2YEFtQW2zA8WruDOc02',
});

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
//app.use("/payment", require("./routes/Payments"));


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


// Create an order
app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body; // Get amount and currency from the request body

    const options = {
        amount: amount * 100, // Amount is in paise
        currency: currency,
        receipt: `receipt_order_${Math.random()}`, // Unique receipt ID
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal server error' });
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
