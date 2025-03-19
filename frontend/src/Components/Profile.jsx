import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "react-modal";
import axios from "axios";
import {
  Lock,
  Mail,
  RefreshCcw,
  SquarePen,
  Trash,
  AlertCircle,
  User,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Password from "./Password";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userIssue, setUserIssue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }

        // Fetch user issues
        const response = await axios.post(
          "http://localhost:8000/customer/issue/all",
          { userId }
        );

        if (response.data.success === true) {
          setUserIssue(response.data.data);
        } else {
          toast.error(response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load your profile data. Please try again later.");
        toast.error("Failed to load your profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [change, navigate]);

  const formatDate = (date) =>
    date ? moment(date).format("DD-MM-YYYY") : "N/A";

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleStatusChange = async (id, status) => {
    try {
      toast.loading("Updating status...");

      const response = await axios.post(
        "http://localhost:8000/customer/issue/delete",
        {
          _id: id,
          status: !status,
        }
      );

      toast.dismiss();

      if (response.data.success) {
        toast.success("Status updated successfully");
        setChange(!change); // Toggle to trigger re-fetch
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error updating issue status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleEditIssue = (issue) => {
    navigate("/issueform", {
      state: {
        mode: "update",
        issueData: {
          _id: issue._id,
          title: issue.title,
          description: issue.description,
          category: issue.category,
          location: issue.location,
          attachment: issue.attachment,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-800 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-teal-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => setChange(!change)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center mx-auto"
          >
            <RefreshCcw size={16} className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-serif bg-gradient-to-b from-teal-50 to-teal-100 py-4 sm:py-8">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        <h2 className="font-bold lg:mt-0 mt-8 sm:mt-2 flex justify-center mb-3 md:mb-8  text-red-600">
          <AlertCircle className="me-2" /> You can't change your password , It's
          not working , we are sorry for it.
        </h2>
        <h2 className="text-3xl md:text-4xl pt-3 lg:text-5xl font-bold mb-6 md:mb-8 text-center text-teal-800">
          Your Profile
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:shadow-2xl">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 sm:px-6 py-6 sm:py-8 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-lg flex items-center justify-center text-teal-600 text-2xl font-bold transition-transform hover:scale-105">
                  {getInitials(user?.name) || <User size={40} />}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {user?.name || "Welcome User"}
                  </h3>
                  <p className="text-teal-100 mt-1 text-sm md:text-base">
                    Member since {formatDate(user?.createdAt)}
                  </p>
                  {user?.userId && (
                    <p className="text-teal-100 text-xs md:text-sm mt-1">
                      ID: {user?.userId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-teal-50 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:bg-teal-100">
                  <div className="flex items-center mb-2">
                    <Mail
                      className="text-teal-600 mr-2 flex-shrink-0"
                      size={20}
                    />
                    <h4 className="text-gray-700 font-medium">Email</h4>
                  </div>
                  <p className="text-gray-600 break-words">
                    {user?.email || "Not provided"}
                  </p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:bg-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Lock
                        className="text-teal-600 mr-2 flex-shrink-0"
                        size={20}
                      />
                      <h4 className="text-gray-700 font-medium">Password</h4>
                    </div>
                    <button
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                      title="Edit Password"
                      onClick={() => setIsPasswordModalOpen(true)}
                    >
                      <SquarePen size={18} />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    {user?.password ? "••••••••" : "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="mt-6 bg-white rounded-xl shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-teal-200 pb-2 mb-4">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                Your Reports
              </h4>
              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {userIssue.length}{" "}
                {userIssue.length === 1 ? "Report" : "Reports"}
              </span>
            </div>

            <div className="py-2 sm:py-4">
              {userIssue && userIssue.length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-teal-500 text-white">
                      <tr>
                        <th className="py-3 px-2 sm:px-4 text-left">Title</th>
                        <th className="py-3 px-2 sm:px-4 text-left">
                          Description
                        </th>
                        <th className="py-3 px-2 sm:px-4 text-left hidden sm:table-cell">
                          Created
                        </th>
                        <th className="py-3 px-2 sm:px-4 text-left">Status</th>
                        <th className="py-3 px-2 sm:px-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-teal-100">
                      {userIssue.map((issue, index) => (
                        <tr
                          key={issue._id || index}
                          className={`${
                            index % 2 === 0 ? "bg-teal-50" : "bg-white"
                          } hover:bg-teal-100 transition-colors`}
                        >
                          <td className="py-3 px-2 sm:px-4 text-teal-700 font-medium">
                            {issue.title}
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-gray-600 max-w-xs truncate">
                            {issue.description}
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-gray-500 text-sm hidden sm:table-cell">
                            {formatDate(issue.createdAt)}
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                issue.action === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : issue.action === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-teal-100 text-teal-800"
                              }`}
                            >
                              {issue.action}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:px-4 flex justify-center space-x-2 sm:space-x-4">
                            <button
                              onClick={() => handleEditIssue(issue)}
                              className="text-teal-600 hover:text-teal-800 transition-colors p-1 hover:bg-teal-100 rounded-full"
                              title="Edit Report"
                            >
                              <SquarePen size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(issue._id, issue.status)
                              }
                              className="text-teal-600 hover:text-teal-800 transition-colors p-1 hover:bg-teal-100 rounded-full"
                              title={
                                issue?.status
                                  ? "Delete Report"
                                  : "Restore Report"
                              }
                            >
                              {issue?.status ? (
                                <Trash size={18} />
                              ) : (
                                <RefreshCcw size={18} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-teal-50 rounded-lg">
                  <AlertCircle
                    className="mx-auto text-teal-400 mb-2"
                    size={32}
                  />
                  <p className="text-gray-600 mb-2">
                    You haven't submitted any reports yet.
                  </p>
                  <p className="text-sm text-gray-500">
                    Create your first report to get started.
                  </p>
                </div>
              )}

              <div className="text-center mt-6 sm:mt-8">
                <Link
                  to="/issueform"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 sm:px-6 rounded-md transition-all shadow hover:shadow-lg hover:scale-105 inline-flex items-center"
                >
                  <SquarePen size={18} className="mr-2" />
                  Create New Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        appElement={document.getElementById("root")}
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
        className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20"
      >
        <Password closeModal={() => setIsPasswordModalOpen(false)} />
      </Modal>
    </div>
  );
}
