import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminQueries = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admindash/queries');
                setQueries(response.data);
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };

        fetchQueries();
    }, []);

    const handleReply = async (queryId) => {
        try {
           const res= await axios.put(`http://localhost:3000/admindash/queries/${queryId}/reply`, {
                adminName: 'Admin', // Replace with actual admin name
                responseMessage,
            });
            setResponseMessage('');
            setSelectedQuery(null);
            if(res.status===200){
                toast.success("Repiled query Sucessfully.!");
            }
            else{
                toast.error("Error while replying!!");
            }
            // Refresh queries
            const response = await axios.get('http://localhost:3000/admindash/queries');
            setQueries(response.data);

        } catch (error) {
            console.error('Error replying to query:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Queries</h1>
            {queries.length === 0 ? (
                <p className="text-gray-500">No queries found.</p>
            ) : (
                <ul className="space-y-6">
                    {queries.map((query) => (
                        <li
                            key={query._id}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                        >
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-700">
                                    <span className="text-gray-600">Name:</span> {query.name}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Email:</strong> {query.email}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Message:</strong> {query.message}
                                </p>
                                <p className={`text-sm font-medium ${query.isResolved ? 'text-green-500' : 'text-red-500'}`}>
                                    <strong>Resolved:</strong> {query.isResolved ? 'Yes' : 'No'}
                                </p>
                            </div>
                            {!query.isResolved && (
                                <div className="mt-4 space-y-2">
                                    <textarea
                                        placeholder="Type your response here..."
                                        value={selectedQuery === query._id ? responseMessage : ''}
                                        onChange={(e) => {
                                            setResponseMessage(e.target.value);
                                            setSelectedQuery(query._id);
                                        }}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                                    />
                                    <button
                                        onClick={() => handleReply(query._id)}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminQueries;
