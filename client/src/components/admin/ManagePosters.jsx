import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePosters = () => {
    const [posters, setPosters] = useState([]);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPosters();
    }, [category, page]);

    const fetchPosters = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admindash/posters', {
                params: { category, page },
            });
            setPosters(response.data.posters);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching posters:', error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setPage(1); // Reset to first page when changing category
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this poster?')) {
            try {
                console.log("Id of deleteing poster : ",id);
                await axios.delete(`http://localhost:3000/admindash/deleteposter/${id}`);
                fetchPosters(); // Refresh poster list
            } catch (error) {
                console.error('Error deleting poster:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Manage Posters</h1>

                {/* Filter Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <label
                            htmlFor="category-filter"
                            className="text-gray-700 font-medium block mb-1"
                        >
                            Filter by Category
                        </label>
                        <select
                            id="category-filter"
                            onChange={handleCategoryChange}
                            value={category}
                            className="px-4 py-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 text-gray-700"
                        >
                            <option value="">All Categories</option>
                            <option value="technology">Technology</option>
                            <option value="marvel">Marvel</option>
                            <option value="movies">Movies</option>
                            <option value="nature">Nature</option>
                            <option value="motivational">Motivational</option>
                            <option value="games">Games</option>
                            <option value="anime">Anime</option>
                            <option value="music">Music</option>
                            <option value="sports">Sports</option>
                            <option value="celebrities">Celebrities</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>

                {/* Posters Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-4 px-6 text-left">Image</th>
                                <th className="py-4 px-6 text-left">Poster ID</th>
                                <th className="py-4 px-6 text-left">Title</th>
                                <th className="py-4 px-6 text-left">Uploaded By</th>
                                <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posters.map((poster, index) => (
                                <tr
                                    key={poster.posterId}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                    } hover:bg-blue-50 transition`}
                                >
                                    <td className="py-4 px-6">
                                        <img
                                            src={poster.posterImg.url}
                                            alt={poster.title}
                                            className="w-16 h-16 object-cover rounded-md shadow-sm"
                                        />
                                    </td>
                                    <td className="py-4 px-6 text-gray-700 font-medium">
                                        {poster.posterId}
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{poster.title}</td>
                                    <td className="py-4 px-6 text-gray-700">
                                        {poster.adminId?.name || 'Unknown'}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleDelete(poster.posterId)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                                        >
                                            <i className="fas fa-trash-alt mr-2"></i>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center items-center gap-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-5 py-3 rounded-lg shadow-md ${
                            page === 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className={`px-5 py-3 rounded-lg shadow-md ${
                            page === totalPages
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ManagePosters;