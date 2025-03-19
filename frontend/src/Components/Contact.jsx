import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <>
      <div className="min-h-[90vh] font-serif bg-pink-100">
        <div className="container mt-10 mx-auto text-center py-10">
          <h1 className="text-[3rem]">
            <span className="font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
              Contact us
            </span>
          </h1>
          <p className=" font-bold mt-4 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or
            need assistance, feel free to reach out. Our team is always here to
            help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white m-2 p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="bg-pink-50 p-6 rounded-lg hover:shadow-md flex items-center">
                <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <a
                    href="mailto:support@towntrouble.com"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    support@towntrouble.com
                  </a>
                </div>
              </div>

              {/* Phone card */}
              <div className="bg-pink-50 p-6 rounded-lg hover:shadow-md flex items-center">
                <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <a
                    href="tel:+91 8456321894"
                  
                    className="text-pink-600 hover:text-pink-800"
                  >
                    +91 8456321894
                  </a>
                </div>
              </div>

              {/* Address card */}
              <div className="bg-pink-50 p-6 rounded-lg hover:shadow-md flex items-center">
                <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-pink-600">
                    123 Main Street,Ludhiana, India
                  </p>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-pink-50 p-6 rounded-lg  hover:shadow-md flex items-center">
                <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">
                    Business Hours
                  </h3>
                  <p className="text-pink-600">Mon - Fri: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
