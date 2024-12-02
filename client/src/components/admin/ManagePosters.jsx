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
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">Manage Posters</h1>
    
            {/* Category Filter */}
            <div className="mb-5 flex justify-center">
                <select
                    onChange={handleCategoryChange}
                    value={category}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
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
    
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Poster ID</th>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Uploaded By</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posters.map((poster, index) => (
                            <tr
                                key={poster.posterId}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-gray- 200 transition-colors`}
                            >
                                <td className="py-3 px-6">
                                    <img
                                        src={poster.posterImg.url}
                                        alt={poster.title}
                                        className="w-16 h-16 object-cover rounded-md shadow-md"
                                    />
                                </td>
                                <td className="py-3 px-6 text-gray-700">{poster.posterId}</td>
                                <td className="py-3 px-6 text-gray-700">{poster.title}</td>
                                <td className="py-3 px-6 text-gray-700">
                                    {poster.adminId?.name || 'Unknown'}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(poster.posterId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* Pagination */}
            <div className="mt-5 flex justify-center items-center gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md shadow-md ${
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
                    className={`px-4 py-2 rounded-md shadow-md ${
                        page === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManagePosters;