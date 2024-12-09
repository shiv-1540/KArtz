import React from 'react';
import { Link } from 'react-router-dom';
import './verify.css'; // Import the custom CSS

const Verify1 = () => {
  return (
    <div id="verify">
      <div id="verify-card">
        <h1 id="verify-title">Verification Request Sent</h1>
        <p id="verify-text">
          Your request has been sent. You will be notified via email once approved by the admin.
        </p>
        <p id="verify-text">
          Admin has been notified of your request. Please check your email for updates.
        </p>
        <button id="verify-button">
          <Link to="/adminlogin">Back to Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Verify1;
