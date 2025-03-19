import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  const aboutContent =
    "Town Trouble makes issue tracking simple and efficient. Founded in 2020, we've built a platform that helps teams of all sizes manage and resolve issues faster. Our mission is to provide an intuitive reporting system that improves communication between users and support teams.";

 
  const faq = [
    {
      question: "How do I create a new report?",
      answer:
        "Click on 'Create New Report' in the Reports section. Fill out the form with your issue details and submit.",
    },
    {
      question: "How can I check the status of my report?",
      answer:
        "View all your reports in the 'Your Reports' section. Each report shows its current status (New, In Progress, or Resolved).",
    },
    {
      question: "How do I edit my profile information?",
      answer:
        "Click the edit icon next to your password to change it. For other profile changes, visit Profile Settings in the top-right menu.",
    },
    {
      question: "Can I delete a report I've submitted?",
      answer:
        "Yes, click the trash icon in the Actions column to delete a report. You can restore deleted reports within 30 days.",
    },
    {
      question: "What happens after I submit a report?",
      answer:
        "Our team will review your report, change its status to 'In Progress' when we start working on it, and mark it 'Resolved' when fixed.",
    },
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      content: "support@towntrouble.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      content: "+91 8456321894",
    },
  ];

  return (
    <div className="min-h-screen font-serif bg-pink-50 py-8 px-4">
      <div className="max-w-3xl pt-10 mx-auto">
        {/* Simple Header */}
        <h1 className="text-[3rem] font-bold text-center text-pink-700 mb-6">
          About Town Trouble
        </h1>

        {/* About Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700">{aboutContent}</p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faq.map((item, index) => (
              <div
                key={index}
                className="border border-pink-100 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left px-4 py-3 flex items-center justify-between bg-pink-50 hover:bg-pink-100 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-pink-800">
                    {item.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp
                      size={16}
                      className="text-pink-600 flex-shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="text-pink-600 flex-shrink-0"
                    />
                  )}
                </button>

                {openFaq === index && (
                  <div className="px-4 py-3 bg-white border-t border-pink-100">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simple Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            Contact Us
          </h2>

          <div className="space-y-3">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <span className="mr-3 text-pink-600">{item.icon}</span>
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Simple CTA */}
        <div className="bg-pink-100 rounded-lg p-6 text-center border border-pink-200">
          <p className="text-gray-700 mb-4">Need help with something else?</p>
          <Link
            to="/contact"
            className="inline-block px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
