// In IssueForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, FileUp, Send, FileText, Tag, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function IssueForm() {
  const location = useLocation();
  const issueData = location.state?.issueData || {};
  const mode = location.state?.mode || "create";

  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const nav = useNavigate();
  const userId = sessionStorage.getItem("userId");

  // Prepopulate the form for update mode
  useEffect(() => {
    if (mode === "update" && issueData) {
      setValue("title", issueData.title || "");
      setValue("description", issueData.description || "");
      setValue("category", issueData.category || "");
      setValue("location", issueData.location || "");
      if (issueData.attachment) {
        setFileName(issueData.attachment);
      }
    }
  }, [mode, issueData, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("location", data.location);

    // Only append file if it exists and was selected
    if (data.attachment && data.attachment[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    formData.append("userId", userId);

    // Different API calls based on mode
    const apiUrl =
      mode === "update"
        ? "http://localhost:8000/customer/issue/update"
        : "http://localhost:8000/customer/issue/add";

    // If updating, add issue ID to formData
    if (mode === "update") {
      formData.append("_id", issueData._id);
    }

    axios
      .post(apiUrl, formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(
            res.data.message ||
              `Issue ${mode === "update" ? "updated" : "created"} successfully!`
          );

          // Reset form and navigate back to profile after a delay
          setTimeout(() => {
            reset();
            setFileName("");
            nav("/profile");
          }, 2000);
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to process request");
      });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const categories = [
    { id: 1, name: "Maintainence" },
    { id: 2, name: "Security Concern" },
    { id: 3, name: "Cleanliness" },
    { id: 4, name: "Accessbility" },
    { id: 5, name: "Others" },
  ];

  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="mt-16 bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-teal-100">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-2xl font-semibold text-teal-800">
            {mode === "update" ? "Update Issue" : "Report an Issue"}
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

          {/* Category Field */}
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
                    mode === "create" && !fileName
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
                    {mode === "update" && " (Current file)"}
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

          {/* Submit Button and Cancel Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 bg-teal-500 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  {mode === "update" ? "Update Issue" : "Submit Issue"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
