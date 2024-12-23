import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios
import toast from "react-hot-toast";
import Input from "@mui/material/Input";
import Button from '@mui/material/Button';
import signup1 from '../../../public/videos/signup.mp4';
import './signup.css';

const AdminSignUp = () => {
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    // Determine current route and target route
    const isUserLogin = location.pathname === '/login';
    const isUserRegister = location.pathname === '/registration';
    const switchTo = isUserLogin || isUserRegister ? 'admin' : 'user';
    const targetPath = isUserLogin
      ? '/adminlogin'
      : isUserRegister
      ? '/adminsignup'
      : location.pathname.includes('adminlogin')
      ? '/login'
      : '/registration';

    const submitForm = async (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password || !confirmPassword) {
            toast.error('Please fill all required fields!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            // API call to the backend
            const response = await axios.post("http://localhost:3000/adminAuthen/adminsignup", {
              name,
              username,
              email,
              password,
              confirmPassword
          });
          
            if (response.status === 201) {
                toast.success('Registration successful!');
                navigate('/adminlogin'); // Redirect to login page
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Registration failed!');
            } else {
                toast.error('An error occurred. Please try again.');
            }
            console.error("Error submitting form:", error);
        }
    };

    return (
        <main>
            <div className='main-container'>

                {/* Switch Button */}
           <button
               onClick={() => navigate(targetPath)}
               className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition"
             >
             Switch to {switchTo === 'admin' ? 'Admin' : 'User'} {isUserLogin || location.pathname.includes('adminlogin') ? 'Login' : 'Register'}
           </button>

                {/* Video Background */}
                <video autoPlay loop muted id="background-video">
                    <source src={signup1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <h1>Kartz</h1>
                <div className='form-container'>
                    <h2>Sign Up</h2>
                    <form onSubmit={submitForm}>
                        <div id="inpts">
                            <Input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <Input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                fullWidth
                            />
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                id='confirmpassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" color="success" type='submit'>
                                Submit
                            </Button>
                        </div>
                        <p>
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AdminSignUp;
