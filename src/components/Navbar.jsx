import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/auth";
import LoadingSpinner from "./LoadingSpinner";
import Spinner from "./Spinner";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Added loading state
  const token = localStorage.getItem("token");

  const user = decodeToken(token); // Use function from utils

  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setLoading(true); // Set loading *after* navigation
      localStorage.removeItem("token"); // Remove JWT Token
      setIsAuthenticated(false); // Update authentication state
      navigate("/login", { replace: true });
    }
  };

  const isActiveNavbarTab = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <>
      <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto" src={logo} alt="Chmsu Jobs" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Chmsu Jobs
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink to="/" className={isActiveNavbarTab}>
                    Home
                  </NavLink>
                  <NavLink to="/jobs" className={isActiveNavbarTab}>
                    Jobs
                  </NavLink>
                  {isAdmin && (
                    <NavLink to="/add-job" className={isActiveNavbarTab}>
                      Add Job
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Navbar;
