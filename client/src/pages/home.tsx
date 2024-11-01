import { Link } from "react-router-dom";

interface ItemProp {
  onOpen: () => void;
}

const Home = ({ onOpen }: ItemProp) => {
  return (
    <section className="relative bg-blue-800 text-white h-screen flex items-center justify-center">
      {/* Main Content */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Pawe Tech University</h1>
        <p className="text-lg mb-8">
          Where passion meets technology. Prepare for a career in the digital age.
        </p>
        <div className="space-x-4">
          <Link
            to="/courses"
            className="hover:opacity-95 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Explore Programs
          </Link>
          <button
            onClick={onOpen}
            className="bg-gray-100 hover:bg-gray-200 text-blue-900 px-6 py-3 rounded-lg font-semibold"
          >
            Signup
          </button>
        </div>
      </div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0" style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}></div>
    </section>
  );
};

export default Home;
