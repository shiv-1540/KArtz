import React, { useContext, useState } from "react";
import {useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import toast from "react-hot-toast"; // Toast for notifications
import { AuthContext, useAuth } from "../../context/AuthContext";
import "./login.css";
import signin1 from '../../../public/videos/signin.mp4';

const LoginForm = () => {
  const location = useLocation();
  const { login } = useContext(AuthContext); // Access the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    // Determine current route and target route
    const isUserLogin = location.pathname === '/';
    const isUserRegister = location.pathname === '/registration';
    const switchTo = isUserLogin || isUserRegister ? 'admin' : 'user';
    const targetPath = isUserLogin
      ? '/adminlogin'
      : isUserRegister
      ? '/adminsignup'
      : location.pathname.includes('adminlogin')
      ? '/'
      : '/registration';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // API call to authenticate user
      const response = await axios.post("http://localhost:3000/userAuthen/login", {
        email,
        password,
    });

      if (response.status === 200) {
        const { token } = response.data;

      
        
        toast.success("Login successful!");
        const userId=response.data.user.id;
        const username=response.data.user.username;
        const profileImage=response.data.user.profileImage;

        console.log("From LoginForm userId : ",userId);
        console.log("From LoginForm username : ",username);

        login(token, userId, profileImage); // Call the login function with the received data
        console.log("Username of user:", username);
        console.log("ProfileImage: ",profileImage);
        navigate(`/home/${username}`); // Redirect to the home page after login
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div id="signin">

    {/* Switch Button */}
    <button
        onClick={() => navigate(targetPath)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition"
      >
        Switch to {switchTo === 'admin' ? 'Admin' : 'User'} {isUserLogin || location.pathname.includes('adminlogin') ? 'Login' : 'Register'}
     </button>
     
    {/* {/* Video Background 
      <video autoPlay loop muted id="background-video">
        <source src={signin1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  */}
      {/* Content */}
      <div id="signhead">
        <h1>Kartz</h1>
      </div>
      <div id="signform">
        <h1 id="signtitle">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div id="inpts">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" id="logintbtn">
              Login
            </button>
          </div>
          <p>
            New to Kartz? <Link to="/registration">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
