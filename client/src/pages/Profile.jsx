import React, { useEffect, useState } from 'react';
import Navbar from '../components/comp/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import me16 from '../assets/imgs/me16.jpg'
import toast from "react-hot-toast"; // Toast for notifications

const Profile = () => {
    const { username } = useParams();
    const [user, setUser ] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        address: ''
    });
    const [profilePicture,setProfilePicture]=useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser   = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/userdash/user/${username}`);
                setUser (response.data);
                console.log("From profile: ", response.data);
    
                // Handle undefined profilePicture
              
                console.log("From profile img: ", profilePicture);
    
                setFormData({
                    name: response.data.name,
                    phoneNo: response.data.phoneNo || '',
                    address: response.data.address || '',
                    profilePicture: profilePicture,
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
            const res = await axios.post('http://localhost:3000/uploadprofimg', {
                image_url: preview,
            });
            console.log("Response data from profileImg: ", res.data);
            setProfilePicture({ publicId: res.data.public_id, url: res.data.secure_url })
            // Update formData with the new profile picture
            
            console.log("Updated formData after image upload: ", 
                profilePicture
            );
            
            toast.success('Image uploaded successfully!');
        } 
        catch (err) {
            console.error('Error uploading image:', err);
            alert('Image upload failed!');
        } 
        finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Log formData before creating updatedFormData
            console.log("Current formData before submission: ", formData);
    
            // Preserve existing profilePicture if not updated
            const data = {
                ...formData,
                profilePicture
            };
    
            console.log("Formdata from line 101: ", data);
            const response = await axios.put(`http://localhost:3000/userdash/updateuser/${username}`, data);
            setUser (response.data);

            console.log("User from line 115: ",response.data);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className='mb-7'>
                <Navbar />
            </div>

            <div className="flex flex-1 bg-gray-600 mt-10">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-900 shadow-md p-6 flex flex-col items-center space-y-6">
                    <img
                        src={user?.profilePicture?.url || {me16}}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-blue-400"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-mono font-semibold text-white-800">{user?.username}</h2>
                        <h3 className="text-yellow-300 font-mono">{user?.name}</h3>
                    </div>
                    <button
                        onClick={handleEditToggle}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {/* Main Section */}
                <div className="flex-1 bg-gray-50 text-gray-800 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Information</h2>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-2xl text-sm font-extrabold">Profile Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {preview && (
                                    <img src={preview} alt="Image Preview" className="mt-2 w-32 h-32 rounded-full border-2 border-gray-300" />
                                )}
                                <button
                                    type="button"
                                    onClick={handleSendFile}
                                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                                >
                                    Upload Image
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name:</label>
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
                                <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address:</label>
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
                                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                Save Changes
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4 bg-white-100 text-gray-900">
                            <h2 >
                                <span className="font-bold">Email:</span> {user?.email}
                            </h2>
                            <h2>
                                <span className="font-bold">Phone Number:</span> {user?.phoneNo || 'Not provided'}
                            </h2>
                            <h2>
                                <span className="font-bold">Address:</span> {user?.address || 'Not provided'}
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;