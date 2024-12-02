import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import AdminNavbar from "../../components/comp/AdminNavbar";

// Import components for each section
import DefaultWelcome from "../../components/admin/DefaultWelcome";
import UploadPoster from "../../components/admin/UploadPoster";
import ManagePosters from "../../components/admin/ManagePosters";
import ManageUsers from "../../components/admin/ManageUsers";
import ManageOrders from "../../components/admin/ManageOrders";
import ManagePayments from "../../components/admin/ManagePayments";

import { useParams } from 'react-router-dom';
import Footer from "../../components/comp/Footer";

const AdminDashboard = () => {
    const {username,id}=useParams();
    const { authData } = useContext(AuthContext);
    const [currentSection, setCurrentSection] = useState("DefaultWelcome"); // Default section

    // Function to determine which component to render
    const renderSection = () => {
        switch (currentSection) {
            case "DefaultWelcome":
                return <DefaultWelcome username={username}/>;
            case "UploadPoster":
                return <UploadPoster username={username} id={id}/>;
            case "ManagePosters":
                return <ManagePosters username={username}/>;
            case "ManageUsers":
                return <ManageUsers username={username} />;
            case "ManageOrders":
                return <ManageOrders />;
            case "ManagePayments":
                return <ManagePayments />;
            default:
                return <DefaultWelcome username={username} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <AdminNavbar 
                user={authData?.user} 
                username={authData?.username} 
                handleLogout={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/adminlogin';
                }} 
            />

            {/* Dashboard Layout */}
            <div className="flex flex-grow mt-12">
                {/* Sidebar */}
                <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
                    <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
                    <nav className="flex flex-col gap-4">
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "DefaultWelcome" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("DefaultWelcome")}
                        >
                            Default Welcome Page
                        </button>
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "UploadPoster" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("UploadPoster")}
                        >
                            Upload Poster
                        </button>
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "ManagePosters" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("ManagePosters")}
                        >
                            Manage Posters
                        </button>
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "ManageUsers" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("ManageUsers")}
                        >
                            Manage Users
                        </button>
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "ManageOrders" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("ManageOrders")}
                        >
                            Manage Orders
                        </button>
                        <button 
                            className={`py-2 px-4 rounded text-left ${currentSection === "ManagePayments" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setCurrentSection("ManagePayments")}
                        >
                            Manage Payments
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-grow bg-gray-100 p-8">
                    {renderSection()}
                </main>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default AdminDashboard;
