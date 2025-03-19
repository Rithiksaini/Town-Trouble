import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ThumbsUp, Clock, MapPin, Tag, User } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment/moment";

export default function SingleIssue() {
  const [singleIssue, setSingleIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState({ totalUpvotes: 0 });
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const customerId = sessionStorage.getItem("userId");

    const fetchData = async () => {
      try {
        // Fetch issue details
        const issueResponse = await axios.post(
          "http://localhost:8000/customer/issue/single",
          { _id: id }
        );
        if (issueResponse.data.status) {
          setSingleIssue(issueResponse.data.data);
        } else {
          toast.error(issueResponse.data.message);
        }

        // Fetch upvote count
        const upvoteResponse = await axios.post(
          "http://localhost:8000/customer/upvote/length",
          { issueId: id }
        );
        if (upvoteResponse.data.success === true) {
          setUpvotes(upvoteResponse.data);
        }

        // Check upvote status (only if customerId exists)
        if (customerId) {
          const upvoteStatusResponse = await axios.post(
            "http://localhost:8000/customer/upvote/single",
            { customerId, issueId: id }
          );
          if (upvoteStatusResponse.data.success === true) {
            setHasUpvoted(true);
          }
        }
      } catch (err) {
        console.error(err.message || "Error fetching issue details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Dependencies: Runs when `id` changes

  const handleUpvote = async () => {
    if (hasUpvoted) return;

    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        toast.error("Please login to upvote issues");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/customer/upvote/add",
        { issueId: id, customerId: userId }
      );

      if (response.data.status) {
        setHasUpvoted(true);
        toast.success(response.data.message);

        // Update upvote count
        const updatedUpvotes = await axios.post(
          "http://localhost:8000/customer/upvote/length",
          { issueId: id }
        );
        if (updatedUpvotes.data.success === true) {
          setUpvotes(updatedUpvotes.data);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message || "Failed to upvote issue");
    }
  };
  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  return (
    <div className="min-h-screen font-serif bg-teal-100 py-8">
      <div className="container mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-800">
          Issue Details
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader loading={loading} color="#ec4899" size={50} />
            <p className="text-lg text-gray-600 ml-4">
              Loading issue details...
            </p>
          </div>
        ) : !singleIssue ? (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <p className="text-gray-600 text-center">
              No issue found with this ID.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              {singleIssue.attachment ? (
                <img
                  src={`http://localhost:8000/${singleIssue.attachment}`}
                  alt={singleIssue.title || "Issue attachment"}
                  className="w-75 h-64 md:h-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-64 md:h-full flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {singleIssue.title}
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDate(singleIssue.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center p-4">
                    <button
                      onClick={handleUpvote}
                      className={`p-3 rounded-full ${
                        hasUpvoted
                          ? "bg-teal-500 text-white cursor-not-allowed"
                          : "bg-teal-100 text-teal-600 hover:bg-teal-200"
                      } transition-colors duration-200`}
                      disabled={hasUpvoted}
                      title={
                        hasUpvoted ? "Already upvoted" : "Upvote this issue"
                      }
                    >
                      <ThumbsUp
                        size={18}
                        className={hasUpvoted ? "fill-white" : ""}
                      />
                    </button>
                    <span className="text-sm font-medium text-gray-700 mt-2">
                      {upvotes?.totalUpvotes || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {singleIssue.description}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="text-teal-500 mr-3 mt-1" size={18} />
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Location:
                      </span>
                      <span className="text-gray-600">
                        {singleIssue.location || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Tag className="text-teal-500 mr-3 mt-1" size={18} />
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Category:
                      </span>
                      <span className="text-gray-600">
                        {singleIssue.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="text-teal-500 mr-3 mt-1" size={18} />
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Reported by:
                      </span>
                      <span className="text-gray-600">
                        {singleIssue.userId?.name || "Anonymous"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {singleIssue.action && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Status
                  </h2>
                  <div className="flex items-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        singleIssue.action === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : singleIssue.action === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {singleIssue.action}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
