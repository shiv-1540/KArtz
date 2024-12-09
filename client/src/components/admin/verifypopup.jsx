import React from 'react';

const VerificationPopup = ({ message, onClose, isSuccess }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"> {/* Set z-50 for the popup container */}
            <div className="fixed inset-0 bg-black opacity-70 z-40"></div> {/* Darker overlay with lower z-index */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-50"> {/* Ensure modal is above overlay */}
                <h2 className={`text-lg font-semibold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {isSuccess ? 'Verification Successful' : 'Verification Failed'}
                </h2>
                <p className="text-gray-700 mb-4">
                    {message}
                </p>
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationPopup;