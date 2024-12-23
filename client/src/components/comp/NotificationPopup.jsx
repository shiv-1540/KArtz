// src/components/NotificationPopup.js
import React, { useEffect } from 'react';

const NotificationPopup = ({ notifications, onClose }) => {
    // Close the popup when the Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="absolute right-0 mt-2 w-80 bg-blue-300 shadow-lg rounded-lg z-50">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500">No notifications</div>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification._id} className="p-4 border-b hover:bg-gray-100">
                            <p className="mt-1 text-sm text-gray-600">User  Message: {notification.message}</p>
                            <p className="font-semibold text-gray-800">{notification.response.adminName}</p>
                            <p className="font-semibold text-gray-800">Replied: {notification.response.responseMessage}</p>
                            <p className="text-sm text-gray-500">{new Date(notification.response.responseDate).toLocaleString()}</p>
                          
                        </div>
                    ))
                )}
            </div>
            <div className="p-2 text-right">
                <button onClick={onClose} className="text-blue-500 hover:underline">Close</button>
            </div>
        </div>
    );
};

export default NotificationPopup;