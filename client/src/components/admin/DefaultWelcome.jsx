import React from 'react';
import { useParams } from 'react-router-dom';

const DefaultWelcome = () => {
    const { username } = useParams(); // Destructure username from useParams

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-lg text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome, {username}!</h2>
                <p className="text-lg mb-6">
                    As an admin, you can manage the following:
                </p>
                <ul className="list-disc list-inside mb-6 text-left">
                    <li>Oversee user accounts and permissions</li>
                    <li>Manage product listings and inventory</li>
                    <li>Handle customer inquiries and support</li>
                    <li>Analyze sales data and performance metrics</li>
                    <li>Promote new products and marketing campaigns</li>
                </ul>
                <blockquote className="italic text-lg mb-6">
                    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." 
                    <br />
                    <span className="font-bold">- Albert Schweitzer</span>
                </blockquote>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default DefaultWelcome;