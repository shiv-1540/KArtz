import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/comp/Navbar';
import { useParams } from 'react-router-dom';

const CartPage = () => {
    const { username } = useParams();
    const [cart, setCart] = useState({ items: [] }); // Initialize with an empty items array

    useEffect(() => {
        const fetchCart = async () => {
            try {
                console.log("Username from cartPage: ", username);
                const response = await axios.get(`http://localhost:3000/userdash/fetchcart/${username}`);
                console.log("Response Cart :", response.data);
                setCart(response.data || { items: [] }); // Ensure cart is an object with items
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCart();
    }, [username]);

    const handleRemoveItem = async (posterId, size) => {
        try {
            await axios.delete(`http://localhost:3000/userdash/cart/deleteitem/${username}/${posterId}/${size}`);
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => !(item.posterId._id === posterId && item.size === size))
            }));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleQuantityChange = async (posterId, size, change) => {
        const item = cart.items.find(item => item.posterId._id === posterId && item.size === size);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
            item.quantity = newQuantity;

            // Update the cart state
            setCart(prevCart => ({
                ...prevCart,
                items: [...prevCart.items]
            }));

            // Optionally, you can send the updated quantity to the server
            try {
                await axios.put(`http://localhost:3000/userdash/cart/updateitem/${username}`, {
                    posterId,
                    size,
                    quantity: newQuantity
                });
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <Navbar />
            <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
                {cart.items && cart.items.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-900 text-light-300">
                                <th className="py-2 px-4 border-b">Item</th>
                                <th className="py-2 px-4 border-b">Size</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Total</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map(item => (
                                <tr key={item.posterId._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <img src={item.posterId.posterImg.url} alt={item.posterId.title} className="w-16 h-16 rounded-md mr-4" />
                                        <span className="text-gray-800">{item.posterId.title}</span>
                                    </td>
                                    <td className="py-2 px-4 text-gray-800 border-b">{item.size}</td>
                                    <td className="py-2 px-4 text-gray-800 border-b flex items-center">
                                        <button 
                                            onClick={() => handleQuantityChange(item.posterId._id, item.size, -1)} 
                                            className="bg-gray-300 text -gray-800 px-2 py-1 rounded-l hover:bg-gray-500"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.posterId._id, item.size, 1)} 
                                            className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r hover:bg-gray-400"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">₹{item.price}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button 
                                            onClick={() => handleRemoveItem(item.posterId._id, item.size)} 
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">Your cart is empty.</p>
                )}
                {cart.items.length > 0 && (
                    <div className="mt-6">
                        <button 
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
                            onClick={() => {/* Handle checkout logic here */}}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;