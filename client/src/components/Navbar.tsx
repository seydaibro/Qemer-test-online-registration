// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { userLogout } from "@/redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface itemProp {
  onOpenSignUP: () => void;
  onOpenLogin: () => void;
}

const Navbar = ({ onOpenSignUP, onOpenLogin }: itemProp) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  
const dispatch = useDispatch()
const navigate = useNavigate()
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

  const handlenavigateToprofile = ()=>{
    navigate("/profile", {state:{user:user}})
  }
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Pawe Tech University</div>
      
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/courses" className="hover:text-gray-300">Courses</Link>
          <Link to="/students"  className="hover:text-gray-300" >students</Link>
          {!user ? (
            <>
              <button onClick={onOpenLogin} className="hover:text-gray-300">Login</button>
              <button onClick={onOpenSignUP} className="hover:text-gray-300">Register</button>
            </>
          ) : (
            <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center rounded-lg cursor-pointer p-2"
            >
              <FaUserCircle className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-lg font-semibold">{user.firstName}</p>
                <p className="text-gray-500 text-sm">{user.role}</p>
              </div>
            </div>
      
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-20">
                <button
               onClick={() => {
                handlenavigateToprofile();
                setDropdownOpen(false);
            }}
            
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={()=> {
                    setDropdownOpen(false); 
                    dispatch(userLogout())
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
              <Link to="/" className="block px-4 py-2 hover:bg-gray-200">Home</Link>
              <Link to="/courses" className="block px-4 py-2 hover:bg-gray-200">Courses</Link>
              {!user ? (
                <>
                  <button onClick={onOpenLogin} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Login</button>
                  <button onClick={onOpenSignUP} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Register</button>
                </>
              ) : (
                <div className="flex items-center p-2">
                  <FaUserCircle className="w-8 h-8" />
                  <div className="ml-2">
                    <h3 className="text-lg font-semibold">{user.firstName}</h3>
                    <p className="text-gray-500">{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
