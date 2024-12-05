import React from 'react';
import LoginForm from './pages/Forms/LoginForm';
import RegistrationForm from './pages/Forms/RegistrationForm'; // Add this
import HomePage from './pages/Home/HomePage'; // Add this
import { Toaster } from 'react-hot-toast'; // Ensure this library is installed
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import './App.css'
import CartPage from './pages/cart.jsx';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import Contact from './pages/contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UploadPoster from './components/admin/UploadPoster.jsx';
import AdminLogin from './pages/Forms/AdminLogin.jsx';
import AdminSignUp from './pages/Forms/AdminSignUp.jsx';
import LandingPage from './pages/landPage.jsx';


const handleLogout=()=>{
   navigate('/')
}


const routes = createBrowserRouter([
  { path: '/', element: <LoginForm/> },
  { path: '/registration', element: <RegistrationForm /> },
  { path: '/adminlogin',element: <AdminLogin/>},
  { path: '/adminsignup',element: <AdminSignUp/>},
  {path:  '/landpage',element:<LandingPage/>},
  { path: '/home/:username', element: <HomePage /> },
  { path: '/cart/:username',  element:<CartPage/>},
  { path: '/profile/:username',element: <Profile/>},
  { path: '/contactus', element: <Contact/>},
  { path: '/admindash/:username/:id', element: <AdminDashboard/>},
  { path:'/upload/:username', element: <UploadPoster/>}
]);

const App = () => (
  <>
      <Toaster position="top-center" />
      <AuthProvider>
          <RouterProvider router={routes} />
      </AuthProvider>
  </>
);

export default App;