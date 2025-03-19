import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Password({ closeModal }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsPassword, setNewsPassword] = useState(false);
  const [confirmsPassword, setConfirmsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      closeModal();
      setLoading(false);
    }, 1000);
  };

  const isFormValid =
    oldPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword;

  return (
    <div className="p-4 bg-white font-serif dark:bg-gray-800 rounded-lg shadow max-w-sm w-full">
      <h2 className="text-lg font-medium mb-4 text-pink-800 dark:text-white">
        Change Password
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-800 dark:text-gray-300">
            Current Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full  border-pink-400 bg-gray-100   p-2 focus:outline-none focus:ring-2
             focus:ring-pink-300 border rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-800 dark:text-gray-300">
            New Password
          </label>
          <div className="relative mt-1">
            <input
              type={newsPassword ? "text" : "password"}
              className="w-full  border-pink-400 bg-gray-100   p-2 focus:outline-none focus:ring-2
             focus:ring-pink-300 border rounded"
              value={oldPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setNewsPassword(!newsPassword)}
            >
              {newsPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-800 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              type={confirmsPassword ?  "text":"password"}
              className={`w-full border-pink-400 bg-gray-100    p-2 border focus:outline-none focus:ring-2
             focus:ring-pink-300 rounded mt-1 ${
               confirmPassword && newPassword !== confirmPassword
                 ? "border-red-500"
                 : ""
             }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setConfirmsPassword(!confirmsPassword)}
            >
              {confirmsPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
          <button
            onClick={closeModal}
            className="px-3 py-1.5 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className="px-3 py-1.5 bg-pink-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

