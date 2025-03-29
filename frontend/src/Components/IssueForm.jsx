import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, FileUp, Send, FileText, Tag, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ApiServices from "../Services/Apiservices";

export default function IssueForm() {
  const location = useLocation();
  const issueData = location.state?.issueData || {};
  const mode = location.state?.mode || "create";
  const isUpdateMode = mode === "update";

  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
    },
  });

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const watchedFile = watch("attachment");
  const watchedCategory = watch("category");

  // Prepopulate form for update mode
  useEffect(() => {
    if (isUpdateMode && issueData) {
      // Populate all form fields from the issue data
      setValue("title", issueData.title || "");
      setValue("description", issueData.description || "");
      setValue("location", issueData.location || "");

      // Set category explicitly
      if (issueData.category) {
        setValue("category", issueData.category);
      }

      // Set attachment filename if it exists
      if (issueData.attachment) {
        setFileName(issueData.attachment);
      }
    }
  }, [isUpdateMode, issueData, setValue]);

  // Track file changes
  useEffect(() => {
    if (watchedFile && watchedFile[0]) {
      setFileChanged(true);
    }
  }, [watchedFile]);

  // Form submission handler
  const onSubmit = useCallback(
    async (data) => {
      try {
        setIsProcessing(true);

        const formData = new FormData();

        // Append basic form fields
        formData.append("title", data.title);
        formData.append("description", data.description);

        // Explicit category handling
        const categoryValue = data.category || getValues("category");
        formData.append("category", categoryValue);

        formData.append("location", data.location);
        formData.append("userId", userId);

        // Handle file attachment
        if (data.attachment && data.attachment[0]) {
          // New file selected
          formData.append("attachment", data.attachment[0]);
        } else if (isUpdateMode && fileName && !fileChanged) {
          // In update mode with existing attachment that hasn't changed
          formData.append("existingAttachment", fileName);
        }

        // Add ID for update operations
        if (isUpdateMode) {
          formData.append("_id", issueData._id);
        }

        // Determine API endpoint based on mode
        const endpoint = isUpdateMode
          ? "http://localhost:8000/customer/issue/update"
          : "http://localhost:8000/customer/issue/add";

        // Try with a direct object for the update to ensure proper data format
        let response;
        if (isUpdateMode) {
          // For update, try a JSON object approach as an alternative
          const updateData = {
            _id: issueData._id,
            title: data.title,
            description: data.description,
            category: categoryValue,
            location: data.location,
            userId: userId,
          };

          if (data.attachment && data.attachment[0]) {
            // If there's a new file, we still need to use FormData
            response = await axios.post(endpoint, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            // If no new file, try a direct JSON approach
            // Try to use the API Service if available
            if (ApiServices && ApiServices.updateIssue) {
              response = await ApiServices.updateIssue(updateData);
            } else {
              response = await axios.post(endpoint, updateData);
            }
          }
        } else {
          // For create, use the original FormData approach
          response = await axios.post(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (response.data.success) {
          toast.success(
            isUpdateMode
              ? "Issue updated successfully!"
              : "Issue reported successfully!"
          );

          // Reset form and navigate after successful submission
          setTimeout(() => {
            reset();
            setFileName("");
            navigate("/profile");
          }, 1500);
        } else {
          throw new Error(response.data.message || "Operation failed");
        }
      } catch (error) {
        toast.error(
          error.message || "Failed to process your request. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [
      isUpdateMode,
      issueData,
      userId,
      reset,
      navigate,
      fileName,
      fileChanged,
      mode,
      getValues,
    ]
  );

  // File change handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileChanged(true);
    }
  };

  // Available issue categories
  const categories = [
    { id: 1, name: "Maintenance" },
    { id: 2, name: "Security Concern" },
    { id: 3, name: "Cleanliness" },
    { id: 4, name: "Accessibility" },
    { id: 5, name: "Others" },
  ];



  // Cancel handler
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="mt-16 bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-teal-100">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-2xl font-semibold text-teal-800">
            {isUpdateMode ? "Update Issue" : "Report an Issue"}
          </h2>
        </div>
        <Toaster position="bottom-right" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="text-sm font-medium text-teal-700 block mb-2">
              Issue Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Brief title describing the issue"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Title must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Title must only contain letters and spaces",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title ? "border-red-300 bg-red-50" : "border-teal-200"
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
              />
              <FileText
                className="absolute right-3 top-3 text-teal-400"
                size={20}
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />{" "}
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="text-sm font-medium text-teal-700 block mb-2">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Detailed explanation of the issue..."
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description must be less than 500 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description
                  ? "border-red-300 bg-red-50"
                  : "border-teal-200"
              } focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
            />
            {errors.description && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />{" "}
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category Field - Modified with explicit onChange handler */}
          <div>
            <label className="text-sm font-medium text-teal-700 block mb-2">
              Category
            </label>
            <div className="relative">
              <select
                {...register("category", {
                  required: "Please select a category",
                })}
                className="w-full px-4 py-3 rounded-lg border border-teal-200 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                value={watchedCategory || ""}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Tag
                className="absolute right-3 top-3 text-teal-400 pointer-events-none"
                size={20}
              />
            </div>
            {errors.category && (
              <p className="mt-1 text-red-700 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />{" "}
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label className="text-sm font-medium text-teal-700 block mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your location"
                {...register("location", {
                  required: "Location is required",
                  minLength: {
                    value: 3,
                    message: "Location must be at least 3 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.location
                    ? "border-red-300 bg-red-50"
                    : "border-teal-200"
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
              />
              <MapPin
                className="absolute right-3 top-3 text-teal-400"
                size={20}
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />{" "}
                {errors.location.message}
              </p>
            )}
          </div>

          {/* File Upload Field */}
          <div>
            <label className="text-sm font-medium text-teal-700 block mb-2">
              Attachment
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                fileName ? "border-teal-300 bg-teal-50" : "border-teal-200"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                {...register("attachment", {
                  required:
                    !isUpdateMode && !fileName
                      ? "Please select a file to attach"
                      : false,
                })}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FileUp
                  className={`${
                    fileName ? "text-teal-500" : "text-teal-400"
                  } mb-2`}
                  size={24}
                />
                {fileName ? (
                  <span className="text-teal-600 text-sm font-medium">
                    {fileName}
                    {isUpdateMode && !fileChanged && " (Current file)"}
                  </span>
                ) : (
                  <span className="text-teal-500 text-sm">
                    Drag and drop files or click to browse
                  </span>
                )}
              </label>
            </div>
            {errors.attachment && (
              <p className="mt-1 text-red-700 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />{" "}
                {errors.attachment.message}
              </p>
            )}
          </div>

          {/* Summary section showing filename, title, description and mode */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-medium text-teal-700 mb-2">Issue Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-teal-600 font-medium">Mode:</p>
                <p className="text-gray-700">
                  {isUpdateMode ? "Update" : "Create"}
                </p>
              </div>
              <div>
                <p className="text-teal-600 font-medium">File Name:</p>
                <p className="text-gray-700">
                  {fileName || "No file attached"}
                </p>
              </div>
              <div>
                <p className="text-teal-600 font-medium">Title:</p>
                <p className="text-gray-700">
                  {watch("title") || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-teal-600 font-medium">Description:</p>
                <p className="text-gray-700 truncate">
                  {watch("description")
                    ? watch("description").length > 30
                      ? watch("description").substring(0, 30) + "..."
                      : watch("description")
                    : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button and Cancel Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isProcessing}
              className="w-2/3 bg-teal-500 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70"
            >
              {isSubmitting || isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  {isUpdateMode ? "Update Issue" : "Submit Issue"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
