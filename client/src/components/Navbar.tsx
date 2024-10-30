// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

interface itemProp{
  onOpenSignUP:()=> void
}
const Navbar = ({onOpenSignUP}:itemProp) => {
  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Pawe Tech University</div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/courses" className="hover:text-gray-300">Courses</Link>
          <button  className="hover:text-gray-300">Login</button>
          <button onClick={onOpenSignUP} className="hover:text-gray-300">Register</button>
         
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
