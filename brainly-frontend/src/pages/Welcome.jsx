import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-2 sm:px-4">
      <div className="max-w-2xl w-full flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
            alt="Welcome"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
          <div className="flex items-center mb-4">
            {/* Heroicon: Academic Cap */}
            <svg className="w-10 h-10 text-blue-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-4.418 0-8-1.79-8-4V10m8 10c4.418 0 8-1.79 8-4V10" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">Brainly</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 text-center">Welcome to Brainly</h1>
          <p className="text-gray-500 mb-4 sm:mb-6 text-center">
            Your collaborative learning platform. Join now to ask, answer, and learn together!
          </p>
          <div className="flex flex-col gap-2 sm:gap-3 w-full">
            <Link to="/signup">
              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">
                Get Started
              </button>
            </Link>
            <Link to="/signin">
              <button className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition font-medium">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="mt-4 sm:mt-8 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} Brainly. All rights reserved.
      </footer>
    </div>
  );
};

export default Welcome;