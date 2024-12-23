const express = require('express');
const router = express.Router();
//const { jwtAdminAuthMiddleware } = require('../middleware/jwtAdmin');
const jwtAdminAuthMiddleware = require('../middleware/jwtAdmin.js');
const crypto = require('crypto');

const Poster=require('../model/PosterSchema.js');
const Admin=require('../model/AdminSchema.js');
const User=require('../model/UserSchema.js');
const Cart=require('../model/CartSchema.js');
const Order=require('../model/OrderSchema');
const Notification = require('../model/NotificationSchema.js'); // Import Notification model
const Query=require('../model/QuerySchema.js')


// Fetch Posters Route
// Fetch Posters Route
router.get('/posters', async (req, res) => {
    try {
        const { category } = req.query; // Extract category from query parameters

        // Build query object
        const query = {};
        if (category) {
            query.category = category.toLowerCase(); // Match lowercase category for consistency
        }

        // Fetch posters from the database without populating admin info
        const posters = await Poster.find(query);

        res.status(200).json(posters);
    } catch (err) {
        console.error('Error fetching posters:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get User Profile by Username
router.get('/user/:username', async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.params.username });
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Return user information (excluding sensitive data if necessary)
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User Profile
// Update User Profile
router.put('/updateuser/:username', async (req, res) => {
    const { username } = req.params;
    const { name, phoneNo, address, profilePicture } = req.body;

    try {
        const updatedUser  = await User.findOneAndUpdate(
            { username },
            { name, phoneNo, address, profilePicture }, // Ensure profilePicture is included
            { new: true, runValidators: true }
        );

        if (!updatedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.status(200).json(updatedUser );
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
});




// CART WALE ROUTES 


// FETECH CART INFO 


// GET /userdash/cart/:username
// router.get('/cart/:username', async (req, res) => {
//     const { username } = req.params;

//     try {
//         // Find the cart by username (or userId if you have a user model)
//         const cart = await Cart.findOne({ username: username }); // Adjust this line based on your schema
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// Fetch cart data for a specific user
// router.get('/fetchcart/:username', async (req, res) => {
//     const { username } = req.params;

//     try {
//         const cart = await Cart.findOne({ username });

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         console.log("cart From cart fetch route:",cart);
//         res.status(200).json(cart);
       
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// Fetch cart data for a specific user




router.get('/fetchcart/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const cart = await Cart.findOne({ username }).populate({
            path: 'items.posterId',
            model: 'Poster',
            select: 'posterImg title price' // Ensure you include the necessary fields
        });
         
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        console.log("Cart from fetch route: ",cart);
      
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// //Add new to CART
// router.post('/cart/:username', async (req, res) => {
//     const { username } = req.params;
//     const { items } = req.body;

//     try {
//         let cart = await Cart.findOne({ username });

//         if (cart) {
//             // Update existing cart
//             items.forEach(item => {
//                 const existingItem = cart.items.find(i => i.posterId.toString() === item.posterId);
//                 if (existingItem) {
//                     existingItem.quantity += item.quantity; // Update quantity
//                 } else {
//                     cart.items.push(item); // Add new item
//                 }
//             });
//             await cart.save();
//         } else {
//             // Create new cart
//             cart = new Cart({ username, items });
//             await cart.save();
//         }

//         res.status(200).json(cart);
//     } catch (error) {
//         console.error('Error adding to cart:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.post('/cart/:username', async (req, res) => {
    const { username } = req.params;
    const { items } = req.body;

    console.log("Request body:", req.body); // Log the entire request body
    console.log("Item from add to Cart route: ", items);

    // Validate items
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items provided' });
    }

    try {
        let cart = await Cart.findOne({ username });

        if (cart) {
            // Update existing cart
            for (const item of items) {
                const existingItem = cart.items.find(i => i.posterId.toString() === item.posterId);
                if (existingItem) {
                    existingItem.quantity += item.quantity; // Update quantity
                    existingItem.price = item.price; // Update price if needed
                } else {
                    cart.items.push(item); // Add new item
                }
            }
            await cart.save();
        } else {
            // Create new cart
            cart = new Cart({ username, items });
            await cart.save();
        }

        // Fetch poster images for the cart items
        const populatedCart = await Cart.findOne({ username }).populate({
            path: 'items.posterId',
            model: 'Poster',
            select: 'posterImg'
        });

        res.status(200).json(populatedCart);
    } catch (error) {
        console.error('Error adding to cart:', error.message); // Log the error message
        res.status(500).json({ error: 'Internal server error' });
    }
});

//DELETE ITEMS 
router.delete('/deleteitem/:username/:posterId/:size', async (req, res) => {
    const { username, posterId, size } = req.params;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ username: username });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item to be removed
        const updatedItems = cart.items.filter(item => !(item.posterId.toString() === posterId && item.size === size));

        // Update the cart with the new items array
        cart.items = updatedItems;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item removed from cart', items: cart.items });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



router.post('/orders/:username', async (req, res) => {
    const { username } = req.params;
    const { items, totalAmount, paymentMethod } = req.body;

    try {
        const order = new Order({
            username,
            items,
            totalAmount,
            paymentMethod,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//CHECKOUT ORDER 
router.post('/checkout/:username', async (req, res) => {
    const { username } = req.params;
    const { paymentMethod } = req.body; // Assuming payment method is sent in the request body

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ username: username });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create a new order
        const newOrder = new Order({
            username: username,
            items: cart.items,
            totalAmount: totalAmount,
            paymentStatus: 'Pending',
            orderStatus: 'Processing',
            paymentMethod: paymentMethod,
        });

        // Save the order
        await newOrder.save();

        // Optionally, clear the cart after checkout
        cart.items = [];
        await cart.save();

        return res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error during checkout:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET ORDER HISTORY
router.get('/order-history/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Find all orders for the user
        const orders = await Order.find({ username: username }).sort({ createdAt: -1 }); // Sort by most recent

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST CREATE ORDER
router.post('/create-order', async (req, res) => {
    const { username, items, totalAmount, paymentMethod } = req.body;

    try {
        // Create a new order
        const newOrder = new Order({
            username: username,
            items: items,
            totalAmount: totalAmount,
            paymentStatus: 'Pending', // Initially set to Pending
            orderStatus: 'Processing', // Initially set to Processing
            paymentMethod: paymentMethod, // Payment method from the request
        });

        // Save the order to the database
        await newOrder.save();

        // Return the order ID and amount for Razorpay
        return res.status(200).json({ id: newOrder._id, amount: totalAmount, currency: 'INR' });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST: Create a new query
router.post('/queries', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newQuery = new Query({ name, email, message });
        await newQuery.save();
        return res.status(201).json({ message: 'Query submitted successfully', query: newQuery });
    } catch (error) {
        console.error('Error submitting query:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET: Get notifications for a user/admin
router.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// PUT: Mark notification as read
router.put('/notifications/:id/read', async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
 return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();
        return res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Route to get notifications for a specific user by username
router.get('/notify/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Fetch the user based on the username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        console.log("Notification checking for:", user.email);

        // Fetch queries related to the user using their email
        const queries = await Query.find({ email: user.email });
        console.log("Notifications for him:", queries);

        // Fetch notifications based on the user's ID
        //const notifications = await Notification.find({ userId: user._id }).populate('userId', 'name email');

        // Prepare the response with only the relevant information
        // const relevantNotifications = notifications.map(notification => {
        //     // Find the corresponding query for the notification
        //     const query = queries.find(q => q._id.equals(notification.queryId));
        //     return {
        //         response: {
        //             adminName: query?.response?.adminName || 'Unknown Admin',
        //             responseMessage: query?.response?.responseMessage || 'No response available',
        //             responseDate: query?.response?.responseDate || new Date(),
        //         },
        //         userMessage: query?.message || 'No message available',
        //     };
        // });
       console.log("For hIMMM:",queries);
        res.status(200).json(queries);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;