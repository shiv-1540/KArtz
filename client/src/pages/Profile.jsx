// Profile.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/comp/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import OrderHistory from './orderhistory';
import me16 from '../assets/imgs/me16.jpg';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import toast from "react-hot-toast"; // Toast for notifications
import './Profile.css';

const Profile = () => {
    const { username } = useParams();
    const { authData, login } = useAuth(); // Access authData and login function

    // Log authData to check its value
    console.log("AuthData: ", authData);

    const [user, setUser ] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        address: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await axios.get(`https://kartz.onrender.com/userdash/user/${username}`);
                setUser (response.data);
                setFormData({
                    name: response.data.name,
                    phoneNo: response.data.phoneNo || '',
                    address: response.data.address || '',
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser ();
    }, [username]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendFile = async () => {
        if (!preview) {
            alert('Please upload an image!');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('https://kartz.onrender.com/uploadprofimg', {
                image_url: preview,
            });
            setProfilePicture({ publicId: res.data.public_id, url: res.data.secure_url });
            login(authData.token, authData.userId, res.data.secure_url);
            toast.success('Image uploaded successfully!');
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Image upload failed!');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                profilePicture
            };
            const response = await axios.put(`https://kartz.onrender.com/userdash/updateuser/${username}`, data);
            setUser (response.data);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-800" id="profile">
        <div className="mb-7">
            <Navbar username={username} profile={authData.profileImage} />
        </div>
        <div className="flex flex-col md:flex-row flex-1 bg-gray-100 mt-10 p-6 space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Card */}
            <div className="w-full md:w-1/4 bg-gray-900 shadow-lg p-6 flex flex-col items-center space-y-6 rounded-lg">
                <img
                    src={user?.profilePicture?.url || profilePicture?.url || me16}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                />
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white">{user?.username}</h2>
                    <h3 className="text-yellow-300 font-medium">{user?.name}</h3>
                </div>
                <button
                    onClick={handleEditToggle}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
            {/* Profile Information */}
            <div className="flex-1 bg-white text-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-sky-800 rounded-lg p-4">Profile Information</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Editing Fields */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Profile Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Image Preview"
                                    className="mt-2 w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
                                />
                            )}
                            <button
                                type="button"
                                onClick={handleSendFile}
                                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 shadow-md"
                            >
                                Upload Image
                            </button>
                        </div>
                        {/* Additional Fields */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4 bg-slate-400 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg">
                            <span className="font-bold">Email:</span> {user?.email}
                        </h2>
                        <h2 className="text-lg">
                            <span className="font-bold  p-2">Phone Number:</span> {user?.phoneNo || 'Not provided'}
                        </h2>
                        <h2 className="text-lg">
                            <span className="font-bold p-2">Address:</span> {user?.address || 'Not provided'}
                        </h2>
                    </div>
                )}
            </div>
            {/* Order History */}
            <div className="w-full md:w-1/4 bg-blue-200 p-6 shadow-lg rounded-lg overflow-y-auto max-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-sky-800 p-3 rounded-lg">Order History</h2>
                <OrderHistory username={username} />
            </div>
        </div>
    </div>

    );
};

export default Profile;