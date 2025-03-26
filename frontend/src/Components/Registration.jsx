import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  MoveRight,
  Loader2,
  MapPin,
  Building,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/customer/registration",
        data
      );
      if (res.data?.success) {
        try {
          const loginRes = await axios.post(
            "http://localhost:8000/user/login",
            data
          );
          if (loginRes.data?.success) {
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Creating your account...",
              success: "Account created successfully!",
              error: "Something went wrong. Please try again.",
            });

            // Store user data
            sessionStorage.setItem(
              "userData",
              JSON.stringify(loginRes.data.data)
            );
            sessionStorage.setItem("userId", loginRes.data.data._id);
            localStorage.setItem("token", loginRes.data.token);

            setTimeout(() => {
              navigate(
                loginRes.data.data.userType === 1
                  ? "/admin/dashboard"
                  : "/issues"
              );
            }, 2000);
          } else {
            setIsSubmitting(false);
            toast.error(
              loginRes.data.message || "Login failed. Please try again."
            );
          }
        } catch (error) {
          setIsSubmitting(false);
          toast.error("Authentication error: " + error.message);
        }
      } else {
        setIsSubmitting(false);
        toast.error(
          res.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Server error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-teal-100 to-slate-100 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 py-8 px-6 text-center">
          <h2 className="text-white text-2xl font-bold">Create Your Account</h2>
          <p className="text-teal-100 text-sm mt-2 opacity-80">
            Join our platform in just a few steps
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-5">
          {/* Personal Information Section */}
          <div className="mb-2">
            <h3 className="text-slate-700 font-medium mb-4">
              Personal Information
            </h3>

            {/* Username Field */}
            <div className="mb-4">
              <div className="relative">
                <User
                  size={18}
                  className="absolute text-slate-400 left-3 top-3"
                />
                <input
                  type="text"
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces allowed",
                    },
                  })}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.name ? "border-red-300" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute text-slate-400 left-3 top-3"
                />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address format",
                    },
                  })}
                  placeholder="Email address"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.email ? "border-red-600" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div> 

          {/* Security Section */}
          <div className="mb-2">
            <h3 className="text-slate-700 font-medium mb-4">
              Account Security
            </h3>

            {/* Password Field */}
            <div className="mb-4">
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute text-slate-400 left-3 top-3"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include: uppercase, lowercase, number, and special character",
                    },
                  })}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.password ? "border-red-300" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute text-slate-400 left-3 top-3"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords don't match",
                  })}
                  placeholder="Confirm password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

        

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <MoveRight size={18} />
            )}
            <span>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </span>
          </button>

          <div className="text-center text-sm text-slate-500 pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
