import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerificationPopup from './verifypopup'; // Adjust the path as necessary

const VerifyAdmins = () => {
    const [unverifiedAdmins, setUnverifiedAdmins] = useState([]);
    const [currentAdmins, setCurrentAdmins] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    

    useEffect(() => {
        fetchUnverifiedAdmins();
        fetchCurrentAdmins();
    }, []);

    const fetchUnverifiedAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admindash/current-unadmins');
            if (Array.isArray(response.data)) {
                setUnverifiedAdmins(response.data);
            } else {
                console.error('Unexpected response format for unverified admins:', response.data);
                setUnverifiedAdmins([]);
            }
        } catch (error) {
            console.error('Error fetching unverified admins:', error);
            setUnverifiedAdmins([]);
        }
    };

    const fetchCurrentAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admindash/current-admins');
            if (Array.isArray(response.data)) {
                setCurrentAdmins(response.data);
            } else {
                console.error('Unexpected response format for current admins:', response.data);
                setCurrentAdmins([]);
            }
        } catch (error) {
            console.error('Error fetching current admins:', error);
            setCurrentAdmins([]);
        }
    };

    const handleVerify = async (id, adminEmail, adminUsername) => {
        try {
            // Verify the admin
            await axios.post(`http://localhost:3000/admindash/verify-admin/${id}`);
            
            console.log("ID:", id," ADMIN EMAIL: ",adminEmail," USERNAME: ",adminUsername);
            // Send email notification
            
            const emailResponse = await axios.post('http://localhost:3000/send', {
                from: "shivghyar538@gmail.com", // Replace with your email
                to: adminEmail, // The email of the admin being verified
                subject: "Account Verification Successful",
                message: `
                    <h1>Your Account Has Been Verified</h1>
                    <p>Dear ${adminUsername},</p> <!-- Use the username in the email -->
                    <p>Your request for account verification has been successfully processed. You can now log in as an admin.</p>
                    <p>Thank you!</p>
                `
            });
    
            // Update state and show success message
            setUnverifiedAdmins(unverifiedAdmins.filter(admin => admin._id !== id));
            setPopupMessage('The admin has been successfully verified. A notification has been sent to their email address.');
            setIsSuccess(true);
            setShowPopup(true);
        } catch (error) {
            console.error('Error verifying admin:', error);
            setPopupMessage('There was an error verifying the admin. Please try again later.');
            setIsSuccess(false);
            setShowPopup(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/admindash/current-admin/${id}`);
            setCurrentAdmins(currentAdmins.filter(admin => admin._id !== id));
            setPopupMessage('The admin has been successfully deleted from the system.');
            setIsSuccess(true);
            setShowPopup(true);
        } catch (error) {
            console.error('Error deleting admin:', error);
            setPopupMessage('There was an error deleting the admin. Please try again later.');
            setIsSuccess(false);
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
            <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">Admin Management</h1>
            
            {/* Unverified Admins Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Unverified Admins</h2>
                <ul className="space-y-4">
                    {unverifiedAdmins.length > 0 ? (
                        unverifiedAdmins.map(admin => (
                            <li
                                key={admin._id}
                                className="flex justify-between items-center p-4 bg-blue-50 border border-blue-300 rounded-lg shadow-sm"
                            >
                                <div>
                                    <p className='font-medium text-gray-900'>{admin.username}</p>
                                    <p className="font-medium text-gray-700">{admin.name}</p>
                                    <p className="text-gray-500 text-sm">{admin.email}</p>
                                </div>
                                <button
                                    onClick={() => handleVerify(admin._id,admin.email,admin.username)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                                >
                                    Verify
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-center">No unverified admins available.</li>
                    )}
                </ul>
            </div>
            
            {/* Current Admins Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Current Admins</h2>
                <ul className="space-y-4">
                    {currentAdmins.length > 0 ? (
                        currentAdmins.map(admin => (
                            <li
                                key={admin._id}
                                className="flex justify-between items-center p-4 bg-red-50 border border-red-300 rounded-lg shadow-sm"
                            >
                                <div>
                                    <p className="font-medium text-gray-700">{admin.name}</p>
                                    <p className="text-gray-500 text-sm">{admin.email}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(admin._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-center">No current admins available.</li>
                    )}
                </ul>
            </div>

            {/* Popup Component */}
            {showPopup && (
                <VerificationPopup message={popupMessage} onClose={handleClosePopup} isSuccess={isSuccess} />
            )}
        </div>
    );
};

export default VerifyAdmins;