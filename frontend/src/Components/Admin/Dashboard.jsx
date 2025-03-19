import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  // State for data
  const [customers, setCustomers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard', 'customers', 'issues', 'resolvedIssues'
  const [statusFilter, setStatusFilter] = useState("All");

  // Status options for dropdown
  const statusOptions = ["Pending", "In Progress", "Resolved", "Rejected"];
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const nav = useNavigate();

  useEffect(() => {
    if (userData?.userType === 1) {
      nav("/admin/dashboard");
    } else {
      toast.error("You're not Admin");
      nav("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const customersResponse = await axios.post(
        "http://localhost:8000/admin/customer/all"
      );
      setCustomers(customersResponse.data.data);

      const issuesResponse = await axios.post(
        "http://localhost:8000/admin/issue/all"
      );
      setIssues(issuesResponse.data.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  const handleStatusChange = async (issueId, newAction) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/issue/updateStatus",
        {
          _id: issueId,
          action: newAction,
        }
      );

      // Update local state to reflect the change immediately
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, action: newAction } : issue
        )
      );
      console.log(response.data);
      if (response.data.success === true) {
        toast.success("Status updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Failed to update issue status:", err);
      toast.error("Failed to update status");
    }
  };

  // Calculate statistics safely
  const statusCounts = (issues || []).reduce((acc, issue) => {
    acc[issue.action] = (acc[issue.action] || 0) + 1;
    return acc;
  }, {});

  // Filter issues based on status filter
  const filteredIssues =
    statusFilter === "All"
      ? issues
      : issues.filter((issue) => issue.action === statusFilter);

  // Filter resolved issues
  const resolvedIssues = issues.filter((issue) => issue.action === "Resolved");

  // Handle card click
  const handleCardClick = (viewType) => {
    setActiveView(viewType);
  };

  // Go back to dashboard
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-teal-700 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <AlertCircle className="mx-auto text-red-500 h-12 w-12 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-teal-50 font-serif min-h-screen">
        <Toaster position="top-center" />
        <header className="bg-white shadow-md py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-teal-700">Town Trouble</h1>
            <h1 className="text-3xl font-bold text-teal-700">
              Admin Dashboard
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-4">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div
                  onClick={() => handleCardClick("customers")}
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <StatCard
                    icon={Users}
                    title="Total Customers"
                    count={customers.length}
                    color="teal"
                  />
                </div>
                <div
                  onClick={() => handleCardClick("issues")}
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <StatCard
                    icon={AlertCircle}
                    title="Total Issues"
                    count={issues.length}
                    color="red"
                  />
                </div>
                <div
                  onClick={() => handleCardClick("resolvedIssues")}
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <StatCard
                    icon={CheckCircle}
                    title="Resolved Issues"
                    count={statusCounts["Resolved"] || 0}
                    color="green"
                  />
                </div>
              </div>
              <hr className="bg-teal-800 h-1" />
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Issue Status Overview
                  </h3>
                  <div className="space-y-4">
                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              status === "Resolved"
                                ? "bg-green-500"
                                : status === "In Progress"
                                ? "bg-teal-500"
                                : status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <span>{status}</span>
                        </div>
                        <span className="font-medium">
                          {statusCounts[status] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {issues.slice(0, 5).map((issue) => (
                      <div
                        key={issue._id}
                        className="flex items-center border-b border-gray-100 pb-2"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            issue.action === "Resolved"
                              ? "bg-green-500"
                              : issue.action === "In Progress"
                              ? "bg-teal-500"
                              : issue.action === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div className="flex-1 truncate">{issue.title}</div>
                        <div className="text-xs text-gray-500">
                          {issue.action || "Pending"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Back button for non-dashboard views */}
          {activeView !== "dashboard" && (
            <button
              onClick={handleBackToDashboard}
              className="mb-6 flex items-center text-teal-600 hover:text-teal-800 transition"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </button>
          )}

          {/* Customers View */}
          {activeView === "customers" && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Customer List
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All registered customers and their details
                  </p>
                </div>
                <div className="bg-teal-100 text-teal-800 p-2 rounded-full flex items-center">
                  <Users size={20} className="mr-2" />
                  <span className="font-semibold">{customers.length}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Password
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {customer.email || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {customer.userId.password ? "********" : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {customer.address || "N/A"}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* All Issues View */}
          {activeView === "issues" && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    All Issues
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All reported issues and their status
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
                    >
                      <option value="All">All Statuses</option>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <Filter
                      size={16}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                  <div className="bg-red-100 text-red-800 p-2 rounded-full flex items-center">
                    <AlertCircle size={20} className="mr-2" />
                    <span className="font-semibold">
                      {filteredIssues.length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reported By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredIssues.map((issue) => (
                      <tr key={issue._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {issue.title || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {issue.description || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {issue.userId?.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              issue.action === "Resolved"
                                ? "bg-green-100 text-green-800"
                                : issue.action === "In Progress"
                                ? "bg-teal-100 text-teal-800"
                                : issue.action === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {issue.action || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={issue.action || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(issue._id, e.target.value)
                            }
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {filteredIssues.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No issues found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Resolved Issues View */}
          {activeView === "resolvedIssues" && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Resolved Issues
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All successfully resolved issues
                  </p>
                </div>
                <div className="bg-green-100 text-green-800 p-2 rounded-full flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  <span className="font-semibold">{resolvedIssues.length}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reported By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resolvedIssues.map((issue) => (
                      <tr key={issue._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {issue.title || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {issue.description || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {issue.userId?.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {issue.location || "N/A"}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {resolvedIssues.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No resolved issues found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
      <footer className="py-8 bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">Town Trouble</h4>
          <p>Making communities better, one report at a time.</p>
          <div className="mt-4">
            <p>
              © Rithik{new Date().getFullYear()} Town Trouble. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

const StatCard = ({ icon: Icon, title, count, color }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-md flex items-center border-l-4 border-${color}-500 hover:shadow-lg transition-shadow duration-200`}
  >
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-500 mr-4`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{count}</h3>
    </div>
  </div>
);

export default AdminDashboard;
