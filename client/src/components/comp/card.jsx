import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"; // Ensure you have react-toastify installed

const Card = ({ poster, username }) => {
    const [selectedSize, setSelectedSize] = useState('A4'); // Set to 'A4' instead of full description
    const [quantity, setQuantity] = useState(1); // Default quantity
    const navigate = useNavigate();

    const sizes = [
        { label: 'A4', price: 499 },
        { label: 'A3', price: 899 },
        { label: '12x18', price: 1199 },
        { label: '13x19', price: 1399 },
    ];

    const handleSizeChange = (size) => {
        setSelectedSize(size); // Set only the label
    };

    const handleAddToCart = async () => {
        try {
            console.log("Username from CARD: ", username);
            
            // Extract the price based on the selected size
            const price = poster.prices[selectedSize]; // Get the price for the selected size
            if (!price) {
                throw new Error(`Price not found for size: ${selectedSize}`);
            }
            
            console.log("Poster price: ", price); // Log the extracted price
            
            const response = await axios.post(`http://localhost:3000/userdash/cart/${username}`, {
                items: [
                    {
                        posterId: poster._id, // Use the poster ID
                        size: selectedSize, // Size selected by the user
                        quantity: quantity, // Quantity selected by the user
                        price: price // Use the extracted price
                    }
                ],
            });
            console.log('Item added to cart:', response.data);
            toast.success('Item added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart.');
        }
    };

    const handleBuyNow = async () => {
        // await handleAddToCart(); // Uncomment if you want to add to cart first
        navigate(`/cart/${username}`); // Navigate to the cart page
    };

    return (
        <div className="w-[250px] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {/* Image Section */}
            <img
                src={poster.posterImg.url} // Access the image URL here
                alt={poster.title} // Assuming poster has a title property
                className="w-full h-[300px] object-cover bg-gray-200"
            />

            {/* Content Section */}
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{poster.title}</h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {poster.description}
                </p>

                {/* Size Selection */}
                <div className=" mt-4">
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Select Size:
                    </label>
                    <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => handleSizeChange(e.target.value)}
                        className="mt-2 block w-full py-2 px-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                        {sizes.map((size) => (
                            <option key={size.label} value={size.label}>
                                {size.label} - ₹{size.price}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity Selection */}
                <div className="mt-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="mt-2 block w-full py-2 px-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>

                {/* Price */}
                <div className="mt-4">
                    <p className="text-base font-semibold text-blue-600">{`Price: ₹${poster.prices[selectedSize]}`}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;