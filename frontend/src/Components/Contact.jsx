import React from "react";
import { useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Contact() {
     useEffect(() => {
       Aos.init({ duration: 1000 });
     }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 font-sans">
      {/* Hero Section */}
      <div
        className="container mx-auto pt-20 pb-16 px-4"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-2 mr-4  py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
              How Can We Help You?
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Our team of experts is ready to assist you with any inquiries or
            concerns. We're committed to providing exceptional service and
            support.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
        className="max-w-6xl mx-auto px-4 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">Email Us</h3>
            <p className="text-gray-500 mb-6">
              Get a response within 24 hours from our support team
            </p>
            <a
              href="mailto:support@towntrouble.com"
              className="text-teal-600 hover:text-teal-800 group flex items-center font-medium text-lg"
            >
              support@towntrouble.com
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Phone card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">Call Us</h3>
            <p className="text-gray-500 mb-6">
              Speak directly with our customer service team
            </p>
            <a
              href="tel:+918456321894"
              className="text-teal-600 hover:text-teal-800 group flex items-center font-medium text-lg"
            >
              +91 8456321894
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Address card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">Visit Us</h3>
            <p className="text-gray-500 mb-6">
              Come by our office for in-person assistance
            </p>
            <div className="text-teal-600 group flex items-center font-medium text-lg">
              123 Main Street, Ludhiana, India
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hours card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">
              Business Hours
            </h3>
            <p className="text-gray-500 mb-6">
              Our team is available during these times
            </p>
            <div className="text-teal-600 group flex items-center font-medium text-lg">
              Mon - Fri: 9AM - 5PM
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
        className="bg-gradient-to-r from-teal-700 to-teal-600 py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Connect With Us
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
            Follow us on social media for updates, tips, and more ways to stay
            connected with our community.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110 duration-300"
            >
              <Facebook className="h-8 w-8 text-white" />
            </a>
            <a
              href="#"
              className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110 duration-300"
            >
              <Twitter className="h-8 w-8 text-white" />
            </a>
            <a
              href="#"
              className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110 duration-300"
            >
              <Instagram className="h-8 w-8 text-white" />
            </a>
            <a
              href="#"
              className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110 duration-300"
            >
              <Linkedin className="h-8 w-8 text-white" />
            </a>
            <a
              href="#"
              className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110 duration-300"
            >
              <Youtube className="h-8 w-8 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
        className="py-16 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our office is conveniently located in the heart of Ludhiana. We
              welcome you to visit us during business hours.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.37343967716!2d75.77427172201776!3d30.900319089437556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1742399683568!5m2!1sen!2sin"
                width={1100}
                height={600}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
