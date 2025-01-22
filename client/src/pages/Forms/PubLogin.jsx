import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import toast from "react-hot-toast"; // Toast for notifications
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import signin1 from '../../../public/videos/signin.mp4';
import verify from "../../components/comp/verify";

import adminlogin from "../../assets/imgs/adminlogin.jpg"
import weblogo from '../../assets/imgs/1121.jpg'

const PubLogin = () => {
  const { login } = useContext(AuthContext); // Access the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // API call to authenticate user
      const response = await axios.post("https://kartz.onrender.com/pubAuthen/publogin", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, userId} = response.data;
        console.log('Token is : ', token);
        console.log("Username from admin login :",response.data.publisher.username);
        // Save the token and userId using AuthContext
        login(token, userId);

        const username=response.data.publisher.username;
        const id=response.data.publisher.id;
        toast.success("Login successful!");
        navigate(`/pubhome/${username}/${id}`); // Redirect to the home page after login
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
  const handleNavigate=(path)=>{
     navigate(path);
  }
  return (
    <div id="signin">
       {/* Switch Button */}
            <button
              onClick={() => handleNavigate("/login")}
              className="fixed top-2 right-4 bg-blue-500 text-white px-3 py-2 rounded shadow-lg hover:bg-blue-600 transition"
             >
                Switch to User Login
            </button>

            <button
             onClick={() => handleNavigate("/adminlogin")}
             className="fixed top-14 right-4 bg-green-500 text-white px-3 py-2 rounded shadow-lg hover:bg-blue-600 transition"
            >
            Switch to Admin Login
          </button>

      {/* Video Background
      <video autoPlay loop muted id="background-video">
        <source src={signin1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      */}
      {/* Content */}
       <h1 className=" fixed left-14 top-20 border-4 border-gray-900">
               <img src={weblogo} alt="Web Logo" className="top-20 h-20" />
        </h1>
      <div className="flex gap-20 mt-12">
         <div className="">
                 <img src={adminlogin} alt="login side" className=" w-80 p-3 border-4 border-white-700 bg-gray-800"/>
          </div>
      
    
      <div id="signform">
       
        <h1 id="signtitle" className="text-red-700">Sign In</h1>
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
            New to Kartz? <Link to="/pubsignup">Sign Up</Link>
          </p>
          <p>
             Not Verified? <Link to="/verify">Request Admin</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default PubLogin;
