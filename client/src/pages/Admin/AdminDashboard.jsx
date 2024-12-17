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

import { useParams } from "react-router-dom";
import Footer from "../../components/comp/footer";
import VerifyAdmins from "../../components/admin/VerifyAdmin";
import AdminQueries from "../../components/admin/ReplyQueries";

const AdminDashboard = () => {
    const { username, id } = useParams();
    const { authData } = useContext(AuthContext);
    const [currentSection, setCurrentSection] = useState("DefaultWelcome"); // Default section

    // Function to determine which component to render
    const renderSection = () => {
        switch (currentSection) {
            case "DefaultWelcome":
                return <DefaultWelcome username={username} />;
            case "UploadPoster":
                return <UploadPoster username={username} id={id} />;
            case "ManagePosters":
                return <ManagePosters username={username} />;
            case "ManageUsers":
                return <ManageUsers username={username} />;
            case "ManageOrders":
                return <ManageOrders />;
            case "ManagePayments":
                return <ManagePayments />;
            case "ManageAdmins":
                return <VerifyAdmins/>;
            case "UserQueries":
                return <AdminQueries/>;
            default:
                return <DefaultWelcome username={username} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <AdminNavbar
                user={authData?.user}
                username={authData?.username}
                handleLogout={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/adminlogin";
                }}
            />

           {/* Dashboard Layout */}
                <div className="flex flex-col min-h-screen">
                {/* Header */}
              
                {/* Main Content */}
                <div className="flex flex-grow mt-16">
                    {/* Sidebar */}
                    <aside className="fixed bg-gradient-to-br from-blue-800 to-gray-900 text-white w-72 min-h-screen shadow-lg p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center mb-2">Admin Panel</h2>
                        <p className="text-sm text-gray-400 text-center">Welcome, {username}!</p>
                    </div>
                    <nav className="flex flex-col gap-3">
                        {[
                        { name: "Default Welcome", key: "DefaultWelcome" },
                        { name: "Upload Poster", key: "UploadPoster" },
                        { name: "Manage Posters", key: "ManagePosters" },
                        { name: "Manage Users", key: "ManageUsers" },
                        { name: "Manage Admins", key: "ManageAdmins" },
                        { name: "Manage Orders", key: "ManageOrders" },
                        { name: "Manage Payments", key: "ManagePayments" },
                        { name: "User Queries", key: "UserQueries" },
                        ].map(({ name, key }) => (
                        <button
                            key={key}
                            className={`py-3 px-4 rounded-lg text-left transition-all font-medium ${
                            currentSection === key
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 hover:bg-blue-600"
                            }`}
                            onClick={() => setCurrentSection(key)}
                        >
                            {name}
                        </button>
                        ))}
                    </nav>
                    </aside>

                    {/* Main Section */}
                    <main className="ml-72 flex-grow bg-gray-50 p-8">
                    <div className="bg-gradient-to-r from-blue-100 to-gray-100 rounded-lg shadow p-8">
                        {renderSection()}
                    </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-blue-800 to-gray-900 text-white text-center py-4 mt-auto shadow-lg">
                    <p>&copy; 2024 KArtz. All rights reserved.</p>
                </footer>
                </div>

        </div>
    );
};

export default AdminDashboard;
