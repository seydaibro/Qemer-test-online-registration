

const Home = () => {
  return (
    <section id="home" className="relative bg-blue-800 text-white h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Pawe Tech University</h1>
        <p className="text-lg mb-8">
          Where passion meets technology. Prepare for a career in the digital age.
        </p>
        <div className="space-x-4">
          <a href="#courses" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
            Explore Programs
          </a>
          <a href="#apply" className="bg-gray-100 hover:bg-gray-200 text-blue-900 px-6 py-3 rounded-lg font-semibold">
            Register
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}></div>
    </section>
  );
};

export default Home;
