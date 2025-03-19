import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRightFromLine, Gem, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Header() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const logOut = () => {
    if (window.confirm("Do you really want to Logout")) {
      setIsLoggingOut(true);

      toast
        .promise(
          new Promise((resolve) => {
            setTimeout(() => {
              sessionStorage.clear();
              localStorage.clear();
              resolve();
            }, 2000);
          }),
          {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: "Logout failed",
          }
        )
        .then(() => {
          setTimeout(() => {
            navigate("/");
            setIsLoggingOut(false);
          }, 500);
        });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-20 top-0 left-0 border-b border-gray-100">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Gem className="text-teal-700 me-2" size={30} />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                TOWN TROUBLE
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-7 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium hover:text-teal-800 ${
                  location.pathname === "/" ? "text-teal-700" : "text-gray-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium hover:text-teal-800 ${
                  location.pathname === "/about"
                    ? "text-teal-700"
                    : "text-gray-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-medium hover:text-teal-800 ${
                  location.pathname === "/contact"
                    ? "text-teal-700"
                    : "text-gray-600"
                }`}
              >
                Contact
              </Link>

              {token && (
                <Link
                  to="/profile"
                  className={`px-3 py-2 text-sm font-medium hover:text-teal-800 ${
                    location.pathname === "/profile"
                      ? "text-teal-700"
                      : "text-gray-600"
                  }`}
                >
                  Profile
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {!token ? (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-sm font-medium text-teal-600 bg-white border border-teal-200 rounded-lg shadow-sm hover:bg-teal-600 hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logOut}
                disabled={isLoggingOut}
                title="logout"
                className={`ml-4 px-4 py-2 text-sm font-medium text-teal-600 bg-transparent border border-teal-200 rounded-lg shadow-sm transition-colors duration-300 ${
                  isLoggingOut
                    ? "bg-teal-50 cursor-not-allowed"
                    : "hover:bg-gradient-to-r from-teal-100 to-yellow-100 hover:text-teal-500"
                }`}
              >
                {isLoggingOut ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowRightFromLine size={18} />
                )}
              </button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden ml-3">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium hover:bg-gray-100 ${
              location.pathname === "/" ? "text-teal-700" : "text-gray-700"
            } hover:text-teal-800 rounded-md`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 text-base font-medium hover:bg-gray-100 ${
              location.pathname === "/about" ? "text-teal-700" : "text-gray-700"
            } hover:text-teal-800 rounded-md`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 text-base font-medium hover:bg-gray-100 ${
              location.pathname === "/contact"
                ? "text-teal-700"
                : "text-gray-700"
            } hover:text-teal-800 rounded-md`}
          >
            Contact
          </Link>

          {/* Conditionally render Profile link for logged-in users */}
          {!!token && (
            <Link
              to="/profile"
              className={`block px-3 py-2 text-base font-medium hover:bg-gray-100 ${
                location.pathname === "/profile"
                  ? "text-teal-700"
                  : "text-gray-700"
              } hover:text-teal-800 rounded-md`}
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
