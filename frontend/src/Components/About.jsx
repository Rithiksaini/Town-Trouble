import { useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  MapPin,
  HelpCircle,
  Target,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const aboutContent = {
    main: "Town Trouble makes issue tracking simple and efficient. Founded in 2020, we've built a platform that helps teams of all sizes manage and resolve issues faster. Our mission is to provide an intuitive reporting system that improves communication between users and support teams.",
    vision:
      "Our vision is to create the most user-friendly issue tracking system that empowers communities to collaborate effectively on solving local problems.",
    approach:
      "We believe in transparent, efficient problem-solving through technology that's accessible to everyone.",
  };

  const faq = [
    {
      question: "How do I create a new report?",
      answer:
        "Click on 'Create New Report' in the Reports section. Fill out the form with your issue details and submit.",
      icon: <HelpCircle size={24} className="text-teal-600" />,
    },
    {
      question: "How can I check the status of my report?",
      answer:
        "View all your reports in the 'Your Reports' section. Each report shows its current status (New, In Progress, or Resolved).",
      icon: <Target size={24} className="text-teal-600" />,
    },
    {
      question: "How do I edit my profile information?",
      answer:
        "Click the edit icon next to your password to change it. For other profile changes, visit Profile Settings in the top-right menu.",
      icon: <Zap size={24} className="text-teal-600" />,
    },
    {
      question: "Can I delete a report I've submitted?",
      answer:
        "Yes, click the trash icon in the Actions column to delete a report. You can restore deleted reports within 30 days.",
      icon: <Users size={24} className="text-teal-600" />,
    },
    {
      question: "What happens after I submit a report?",
      answer:
        "Our team will review your report, change its status to 'In Progress' when we start working on it, and mark it 'Resolved' when fixed.",
      icon: <Clock size={24} className="text-teal-600" />,
    },
  ];

  const teamValues = [
    {
      icon: <Users size={24} className="text-teal-600" />,
      title: "Community-Focused",
      description:
        "We prioritize building tools that strengthen community connections and collaboration.",
    },
    {
      icon: <Clock size={24} className="text-teal-600" />,
      title: "Responsive",
      description:
        "We believe in quick response times and efficient resolution of reported issues.",
    },
    {
      icon: <MapPin size={24} className="text-teal-600" />,
      title: "Local Impact",
      description:
        "Our solutions are designed to create meaningful improvements in local communities.",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      <div
      
        className="bg-gradient-to-r from-teal-700 to-teal-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-700 opacity-10 animate-pulse"></div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center lg:mt-10 md:text-left md:w-2/3">
            <h1
              className="text-3xl md:text-5xl font-bold mb-4 transform transition-all duration-700 hover:scale-105"
            >
              About Town Trouble
            </h1>
            <p
              className="text-lg md:text-xl opacity-90"
            >
              Making community issue tracking simple, efficient, and effective.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Enhanced Animations */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* About Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8 transform hover:-translate-y-2 duration-300"
        >
          <h2 className="text-2xl font-semibold text-teal-800 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {aboutContent.main}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Our Vision",
                content: aboutContent.vision,
                aosDelay: 200,
              },
              {
                title: "Our Approach",
                content: aboutContent.approach,
                aosDelay: 400,
              },
            ].map((section, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={section.aosDelay}
                className="bg-teal-50 p-6 rounded-lg border border-teal-100 hover:bg-teal-100/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-teal-700 mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold text-teal-800 mb-6">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamValues.map((value, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={`${200 * (index + 1)}`}
                className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-slate-50 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center bg-teal-100 w-12 h-12 rounded-full mb-4 animate-pulse">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold text-teal-800 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                data-aos="slide-up"
                data-aos-delay={`${100 * (index + 1)}`}
                className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between bg-white hover:bg-teal-50 transition-colors group"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    {item.icon}
                    <span className="font-medium text-slate-800 group-hover:text-teal-700 transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <span className="flex-shrink-0 ml-2 bg-teal-100 rounded-full p-1">
                    {openFaq === index ? (
                      <ChevronUp size={16} className="text-teal-600" />
                    ) : (
                      <ChevronDown size={16} className="text-teal-600" />
                    )}
                  </span>
                </button>

                {openFaq === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 py-4 bg-teal-50 border-t border-slate-200 animate-fadeIn"
                  >
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          data-aos="zoom-in"
          data-aos-duration="800"
          className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-8 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-700 opacity-10 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-4">
              Need help with something else?
            </h2>
            <p className="mb-6 opacity-90">
              Our support team is ready to assist you with any questions or
              issues.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-white text-teal-700 font-medium rounded-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
