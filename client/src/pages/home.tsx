import { Link } from "react-router-dom";
import SignUp from "./signup";
import { useState } from "react";

interface ItemProp {
  onOpen: () => void;
}

const Home = ({ onOpen }: ItemProp) => {
  // Correctly placed useState hook
  const [isAdminRegister, setIsAdminRegister] = useState(false);

  return (
    <>
      {/* Conditional rendering for the SignUp component */}
      {isAdminRegister && (
        <SignUp onClose={() => setIsAdminRegister(false)} role="admin" />
      )}

    <section className=" bg-blue-800 text-white h-screen flex items-center justify-center">
    
      {/* Main Content */}
      <div className=" mx-auto text-center relative z-10">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Pawe Tech University
        </h1>
        <p className="text-lg mb-8">
          Where passion meets technology. Prepare for a career in the digital age.
        </p>
        <div className="flex gap-3 items-center justify-center">
          {/* Register Admin Button */}
          <button
            onClick={() => setIsAdminRegister(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold hover:text-gray-200"
          >
            Register Admin
          </button>

          {/* Explore Programs Link */}
          <Link
            to="/courses"
            className="hover:opacity-95 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Explore Programs
          </Link>

          {/* Signup Button */}
          <button
            onClick={onOpen}
            className="bg-gray-100 hover:bg-gray-200 text-blue-900 px-6 py-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
      ></div>
    </section>
    </>
  );
};

export default Home;
