import { useState } from "react";
import { Link } from "react-router-dom";

const VisitorHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('./images/hero-bg.jpg')",
        }}
      />

      {/* Gradient + Blur Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-sm sm:backdrop-blur-md md:backdrop-blur-lg" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 w-full z-20 px-4 sm:px-6 py-6 sm:py-8 bg-black/60 backdrop-blur-md flex justify-between items-center shadow-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
            MyInvoice<span className="text-blue-500">App</span>
          </h1>

          {/* Desktop Navbar Links */}
          <div className="hidden sm:flex space-x-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-sm font-medium rounded-full bg-blue-700 hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar & Backdrop */}
        <div
          className={`fixed inset-0 z-30 sm:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Fade-in Background */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in Sidebar */}
          <div
            className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-black text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="text-white text-3xl p-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col items-center gap-6 text-lg mt-10">
              <Link
                to="/login"
                className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 w-3/4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-full bg-blue-700 hover:bg-blue-600 w-3/4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-12 sm:py-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Smarter Invoice Management
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
            Generate, track, and manage all your invoices effortlessly in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-7 py-2.5 bg-gray-800 text-white rounded-full text-base font-semibold hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/signup"
              className="px-7 py-2.5 bg-blue-700 text-white rounded-full text-base font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Create Account
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-xs text-gray-400 py-6 text-center px-4">
          &copy; {new Date().getFullYear()} MyInvoiceApp. Built with
        </footer>
      </div>
    </div>
  );
};

export default VisitorHome;
