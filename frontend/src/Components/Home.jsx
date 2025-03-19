import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import {
  User,
  ChevronRight,
  Plus,
  Clock,
  XCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import HeroSection from "./Home/HeroSection";

export default function Home() {
  // State to store issues and loading status
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  // Success stories data
  const [successStories, setSuccessStories] = useState([
    {
      id: 1,
      title: "Main Street Pothole Repair",
      description:
        "A dangerous pothole on Main Street was reported and fixed within 48 hours, preventing potential accidents.",
      impact: "Improved safety for over 2,000 daily commuters",
      rating: 5,
      userName: "Ajay kainth",
    },
    {
      id: 2,
      title: "Community Park Lighting",
      description:
        "After multiple reports about poor lighting in Central Park, the municipality installed new LED lights throughout the area.",
      impact: "Created a safer environment for evening park visitors",
      rating: 3.5,
      userName: "Tanveer singh",
    },
    {
      id: 3,
      title: "Graffiti Removal Project",
      description:
        "Several instances of graffiti on the historic district buildings were reported and cleaned within a week.",
      impact: "Restored the beauty of our town's historic center",
      rating: 5,
      userName: "Rithik saini",
    },
  ]);

  // Fetch issues when component loads
  useEffect(() => {
    fetchIssues();

    // Simple animation to cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [setIssues]);

  // Function to get issues from server
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/customer/issue/all",
        { status: true }
      );
      if (response.data.status) {
        setIssues(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch issues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Get status icon and color based on issue action
  const getStatusInfo = (action) => {
    if (!action)
      return {
        icon: <AlertCircle size={16} />,
        color: "bg-gray-100 text-gray-700",
        label: "Unknown",
      };

    const status = action.toLowerCase();

    if (status === "pending") {
      return {
        icon: <Clock size={16} />,
        color: "bg-yellow-100 text-yellow-700",
        label: "Pending",
      };
    } else if (status === "in progress" || status === "inprogress") {
      return {
        icon: <AlertCircle size={16} />,
        color: "bg-teal-100 text-teal-700",
        label: "In Progress",
      };
    } else if (status === "completed" || status === "resolved") {
      return {
        icon: <CheckCircle size={16} />,
        color: "bg-green-100 text-green-700",
        label: "Resolved",
      };
    } else if (status === "rejected") {
      return {
        icon: <XCircle size={16} />,
        color: "bg-red-100 text-red-700",
        label: "Rejected",
      };
    } else {
      return {
        icon: <AlertCircle size={16} />,
        color: "bg-gray-100 text-gray-700",
        label: action,
      };
    }
  };

  // How It Works steps
  const works = [
    {
      id: 1,
      title: "Report an Issue",
      description:
        "Spot a problem in your community? Report it with just a few taps.",
    },
    {
      id: 2,
      title: "Verification",
      description:
        "Our team verifies the issue and assigns it to the appropriate department.",
    },
    {
      id: 3,
      title: "Resolution Process",
      description: "Track the progress as municipal workers address the issue.",
    },
    {
      id: 4,
      title: "Problem Solved",
      description:
        "Once resolved, you can review the solution and provide feedback.",
    },
  ];

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ));
  };
  const token = sessionStorage.getItem("token");
  const nav = useNavigate();
  const report = () => {
    if (!token) {
      nav("/login");
    } else {
      nav("/issueform");
    }
  };
  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section with Simple Animation */}

      <HeroSection />
      {/* How Town Trouble Works Section with Active Step Highlighting */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">
              How Town Trouble Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Making your community better in four simple steps.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4 md:gap-8">
            {works.map((step) => (
              <div
                key={step.id}
                className={`w-full md:w-1/4 bg-white rounded-xl shadow-lg p-6 flex flex-col transition-all duration-500 ${
                  activeStep === step.id
                    ? "transform -translate-y-2 border-2 border-teal-600"
                    : ""
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      activeStep === step.id
                        ? "bg-teal-600 text-white"
                        : "bg-teal-200 text-teal-800"
                    } flex items-center justify-center text-xl font-bold transition-all duration-300`}
                  >
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center text-sm flex-grow">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Simple Progress Bar */}
          <div className="mt-8 max-w-md mx-auto bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full transition-all duration-300"
              style={{ width: `${activeStep * 25}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Issues Section with Fade-in Animation */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl text-teal-700  font-bold text-center mb-8">
            Recent Issues
          </h3>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues && issues.length > 0 ? (
                issues.slice(0, 3).map((issue, index) => {
                  const statusInfo = getStatusInfo(issue.action);

                  return (
                    <div
                      key={issue._id || index}
                      className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      <div className="relative">
                        {issue?.attachment && (
                          <div className="w-full h-48 bg-gray-200 overflow-hidden">
                            <img
                              src={"http://localhost:8000/" + issue?.attachment}
                              alt={issue?.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                        )}

                        {/* Status Badge */}
                        <div
                          className={`absolute top-4 right-4 ${statusInfo.color} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md`}
                        >
                          {statusInfo.icon}
                          <span>{statusInfo.label}</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          {issue.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-3">
                          {issue.description}
                        </p>

                        <div className="flex items-center text-gray-500 text-xs mb-4">
                          <MapPin size={14} className="mr-1" />
                          <span>{issue.location}</span>
                        </div>

                        {/* Simple progress bar */}
                        <div className="w-full h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
                          <div
                            className={
                              issue.action?.toLowerCase() === "rejected"
                                ? "h-full bg-red-500 transition-all duration-1000"
                                : "h-full bg-teal-600 transition-all duration-1000"
                            }
                            style={{
                              width:
                                issue.action?.toLowerCase() === "pending"
                                  ? "25%"
                                  : issue.action?.toLowerCase() ===
                                      "in progress" ||
                                    issue.action?.toLowerCase() === "inprogress"
                                  ? "50%"
                                  : issue.action?.toLowerCase() ===
                                      "completed" ||
                                    issue.action?.toLowerCase() === "resolved"
                                  ? "100%"
                                  : issue.action?.toLowerCase() === "rejected"
                                  ? "100%"
                                  : "0%",
                            }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-xs">
                            <User size={14} className="mr-1" />
                            <span>{issue.userId?.name || "Anonymous"}</span>
                          </div>

                          <Link
                            to={`/singleissue/${issue._id}`}
                            className="flex items-center text-xs font-medium text-teal-600 hover:text-teal-800 transition-colors"
                          >
                            <span>View Details</span>
                            <ChevronRight
                              size={14}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow">
                  <AlertCircle size={48} className="text-teal-600 mb-4" />
                  <h4 className="text-xl font-medium text-gray-800 mb-2">
                    No Issues Found
                  </h4>
                  <p className="text-gray-600 text-center mb-4">
                    Be the first to report an issue in your community.
                  </p>
                  <Link
                    to="/issueform"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300"
                  >
                    Report Issue
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* View All Issues Button with Hover Animation */}
          {issues && issues.length > 0 && (
            <div className="flex justify-center mt-8">
              <Link
                to="/issues"
                className="bg-white px-8 py-3 font-medium text-teal-600 rounded-lg shadow-lg hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                View All Issues
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how Town Trouble has helped transform our community with real
              results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {story.title}
                    </h4>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm">
                      <CheckCircle size={14} className="mr-1" />
                      <span>Resolved</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {story.description}
                  </p>

                  <div className="bg-green-100 p-3 rounded-lg mb-4">
                    <p className="text-green-700 text-sm font-medium">
                      <span className="font-bold">Impact:</span> {story.impact}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-xs">
                      <User size={14} className="mr-1" />
                      <span>{story.userName}</span>
                    </div>

                    <div className="flex items-center">
                      {renderStars(story.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="bg-white px-8 py-3 font-medium text-teal-600 rounded-lg shadow-lg hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              View All Success Stories
            </Link>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
    </div>
  );
}
