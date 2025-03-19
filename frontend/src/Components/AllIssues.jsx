import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  User,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

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
        h;
        showNotification(response.data.message, "error");
      }
    } catch (err) {
      console.error(err);
      showNotification(
        "Failed to fetch issues. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "info") => {
    alert(message);
  };

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

  // Filter issues based on selected filter and search term
  const filteredIssues = issues.filter((issue) => {
    const matchesFilter =
      filter === "all" ||
      (issue.action && issue.action.toLowerCase() === filter);

    const matchesSearch =
      !searchTerm ||
      (issue.title &&
        issue.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (issue.description &&
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (issue.location &&
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen font-serif bg-teal-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h3 className="text-2xl pt-10 md:text-3xl text-teal-700 font-bold text-center mb-6">
          Community Issues
        </h3>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search issues....."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("in progress")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === "inprogress"
                    ? "bg-teal-600 text-white"
                    : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter("resolved")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === "resolved"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Resolved
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Rejected
              </button>
            </div>

            <button
              onClick={fetchIssues}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              title="Refresh issues"
            >
              <RefreshCw size={16} />
              <span className="hidden md:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-500">
                Showing {filteredIssues.length}{" "}
                {filteredIssues.length === 1 ? "issue" : "issues"}
                {filter !== "all" ? ` with status "${filter}"` : ""}
                {searchTerm ? ` matching "${searchTerm}"` : ""}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue, index) => {
                    const statusInfo = getStatusInfo(issue.action);

                    return (
                      <div
                        key={issue._id || index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        style={{
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}`,
                        }}
                      >
                        <div className="relative">
                          {issue?.attachment ? (
                            <div className="w-full h-48 bg-gray-200 overflow-hidden">
                              <img
                                src={
                                  "http://localhost:8000/" + issue?.attachment
                                }
                                alt={issue?.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/400x200?text=Image+Not+Available";
                                  e.target.alt = "Image not available";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 bg-teal-50 flex items-center justify-center">
                              <div className="text-teal-300 text-center">
                                <AlertCircle
                                  size={32}
                                  className="mx-auto mb-2"
                                />
                                <span className="text-sm">
                                  No image available
                                </span>
                              </div>
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
                          <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                            {issue.title || "Untitled Issue"}
                          </h4>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {issue.description || "No description provided"}
                          </p>

                          <div className="flex items-center text-gray-500 text-xs mb-4">
                            <MapPin size={14} className="mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {issue.location || "Location not specified"}
                            </span>
                          </div>

                          {/* Progress bar with label */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>
                                {issue.action?.toLowerCase() === "pending"
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
                                  : "0%"}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
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
                                        issue.action?.toLowerCase() ===
                                          "inprogress"
                                      ? "50%"
                                      : issue.action?.toLowerCase() ===
                                          "completed" ||
                                        issue.action?.toLowerCase() ===
                                          "resolved"
                                      ? "100%"
                                      : issue.action?.toLowerCase() ===
                                        "rejected"
                                      ? "100%"
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-xs">
                              <User size={14} className="mr-1 flex-shrink-0" />
                              <span className="truncate max-w-24">
                                {issue.userId?.name || "Anonymous"}
                              </span>
                            </div>

                            <Link
                              to={`/singleissue/${issue._id}`}
                              className="flex items-center text-xs font-medium text-teal-600 hover:text-teal-800 transition-colors group"
                            >
                              <span>View Details</span>
                              <ChevronRight
                                size={14}
                                className="transition-transform duration-500 group-hover:translate-x-1"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center bg-teal-50 rounded-xl p-8">
                    <AlertCircle size={48} className="text-teal-600 mb-4" />
                    <h4 className="text-xl font-medium text-gray-800 mb-2">
                      No Issues Found
                    </h4>
                    <p className="text-gray-600 text-center mb-4">
                      {searchTerm || filter !== "all"
                        ? "Try adjusting your search or filter criteria."
                        : "Be the first to report an issue in your community."}
                    </p>
                    <div className="flex gap-4">
                      {(searchTerm || filter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setFilter("all");
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                        >
                          Clear Filters
                        </button>
                      )}
                      <Link
                        to="/issueform"
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300"
                      >
                        Report Issue
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Add New Issue Button - Fixed at Bottom Right on Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <Link
            to="/issueform"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors duration-300"
            aria-label="Report new issue"
          >
            <span className="text-2xl font-bold">+</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllIssues;
