import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadPoster = ({username,id}) => {
    console.log("Id from Upload: ",id);
    const [posterData, setPosterData] = useState({
        title: '',
        description: '',
        A4: '',
        A3: '',
        size12x18: '',
        size13x19: '',
        category: '',
        adminId:id
    });
    const [posterImg, setPosterImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');

    const categories = [
            "Technology",
            "Marvel",
            "Movies",
            "Motivational",
            "Nature",
            "Sports",
            "Games",
            "Anime",
            "Music",
            "Celebrities",
            "Custom"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPosterData({ ...posterData, [name]: value });
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

    const handleSendFile = async (e) => {
        e.preventDefault();
        if (!preview) {
            alert('Please upload an image!');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/upload', {
                image_url: preview,
            });
            setPosterImg({ publicId: res.data.public_id, url: res.data.secure_url });
            toast.success("Image uploaded sucessfully..!")

        } catch (err) {
            console.error('Error uploading image:', err);
            // alert('Image upload failed!');
            toast.error("Image upload failed")
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!posterImg) {
            alert('Please upload an image first!');
            return;
        }
    
        const data = {
            ...posterData,
            posterImg,
            prices: {
                A4: posterData.A4,
                A3: posterData.A3,
                "12x18": posterData.size12x18,
                "13x19": posterData.size13x19,
            },
            adminId: id,
        };
    
        console.log('Data being sent:', data); // Log the data being sent
    
        try {
            const token = localStorage.getItem('token');
            
            const res = await axios.post(
                'http://localhost:3000/admindash/uploadposter',
                data
            );
            
            toast.success('Poster uploaded successfully!');
            // Reset form state
            setPosterData({
                    title: '',
                    description: '',
                    A4: '',
                    A3: '',
                    size12x18: '',
                    size13x19: '',
                    category: '',
                    adminId:id
                });
            setPosterImg(null);
            setPreview('');

        } catch (err) {
            console.error('Error uploading poster:', err);
            alert('Poster upload failed!');
        }
    };


    return (
        <div className="h-70vh bg-purple-100 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-200 to-blue-300 bg-blue-200 rounded-lg shadow-2xl flex flex-col lg:flex-row">
            {/* Side Image or Preview */}
            <div className="hidden lg:flex flex-col text-darkGray justify-center items-center w-1/2 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg text-white">
                <h1 className="text-2xl text-gray-800 font-extrabold mb-4">Poster Upload</h1>
                <p className="text-md mb-6 text-center">Add a new poster with all the details to showcase your collection.</p>
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-h-60 rounded-lg shadow-lg"
                    />
                ) : (
                    <div className="h-60 w-full flex items-center justify-center bg-white bg-opacity-20 rounded-lg">
                        <p className="text-sm italic">Image preview will appear here</p>
                    </div>
                )}
            </div>
    
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-6">
                <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
                    Upload New Poster
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={posterData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter poster title"
                        />
                    </div>
    
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={posterData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter poster description"
                        ></textarea>
                    </div>
    
                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={posterData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
    
                    {/* Prices */}
                    {['A4', 'A3', 'size12x18', 'size13x19'].map((size, index) => (
                        <div className="mb-4" key={index}>
                            <label className="block text-md font-medium text-gray-700">
                                Price ({size.toUpperCase()})
                            </label>
                            <input
                                type="number"
                                name={size}
                                value={posterData[size]}
                                onChange={handleChange}
                                required
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter price for ${size}`}
                            />
                        </div>
                    ))}
    
                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-md font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            required
                            className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
    
                    {/* Upload Button */}
                    <button
                        onClick={handleSendFile}
                        type="button"
                        disabled={loading}
                        className="w-full mb-4 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Uploading...' : 'Upload Image'}
                    </button>
    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    </div>
    
    );
};

export default UploadPoster;
