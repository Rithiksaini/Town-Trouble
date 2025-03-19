import React from "react";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const report = () => {
    // Your report function implementation
  };

  return (
    <div className=" min-h-screen max-w-7xl mx-auto pt-16">
      <div className="container mx-auto px-4 pt-16 pb-24">
        {/* Two-column layout for desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100">
              <span className="text-xs font-medium text-teal-600">
                Smart City Initiative
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Make Your City <span className="text-teal-600">Smarter</span>{" "}
              Together
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 max-w-lg">
              Join thousands of citizens improving urban life through
              community-driven reporting and problem solving.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center sm:justify-center justify-center sm:flex-row gap-4">
              <button
                onClick={report}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 lg:w-75 md:w-75 w-52 sm:w-auto"
              >
                <Link>
                  Report New Issue
                  <ArrowRight size={18} className="ms-14" />
                </Link>
              </button>

              <Link
                to="/issues"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 lg:w-75 md:w-75 w-52 sm:w-auto"
              >
                <MapPin size={18} />
                View Issues
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-y-4 gap-x-8">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  <span className="text-gray-700">24h Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  <span className="text-gray-700">3,000+ Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  <span className="text-gray-700">City-wide Coverage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative">
              {/* Main image */}
              <img
                src="https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Examples%20of%20Municipal%20Government%20Websites.jpg"
                alt="Smart City Visualization"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issues Resolved</p>
                    <p className="text-lg font-bold text-gray-900">1,234+</p>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-600 rounded-full opacity-20 blur-2xl hidden md:block"></div>

              {/* Decorative dot pattern */}
              <div className="absolute -right-8 bottom-1/3 hidden md:block">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-teal-600 opacity-60"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
