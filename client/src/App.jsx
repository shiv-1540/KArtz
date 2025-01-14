import React from 'react';
import LoginForm from './pages/Forms/LoginForm';
import RegistrationForm from './pages/Forms/RegistrationForm'; // Add this
import HomePage from './pages/Home/HomePage'; 
import { Toaster } from 'react-hot-toast'; 
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
import Verify1 from './components/comp/verify.jsx';
import ProtectedRoute from './components/comp/ProtectedRoute.jsx';


const handleLogout=()=>{
   navigate('/')
}


const routes = createBrowserRouter([
      { path:  '/',element:<LandingPage/>},
      { path: '/login', element: <LoginForm/> },
      { path: '/registration', element: <RegistrationForm /> },
      { path: '/adminlogin',element: <AdminLogin/>},
      { path: '/adminsignup',element: <AdminSignUp/>},
      

      {
        path: '/home/:username',
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
      },
      {
        path: '/cart/:username',
        element: (
            <ProtectedRoute>
                <CartPage />
            </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:username',
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
      },
      {
        path: '/contactus/:username',
        element: (
            <ProtectedRoute>
                <Contact />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admindash/:username/:id',
        element: (
                <AdminDashboard />
        ),
    },
    {
        path: '/upload/:username',
        element: (
     
                <UploadPoster />
    
        ),
      },
     { path:'/verify', element:<Verify1/>}
]);

const App = () => {

  return   (
    <>
        <Toaster position="top-center" />
        <AuthProvider>
           <RouterProvider router={routes} />
        </AuthProvider>
    </>
  );
}


export default App;