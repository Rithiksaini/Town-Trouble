import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validate on every change
  });

  const navigate = useNavigate();
  const password = watch("password", "");

  // Password strength validation
  useEffect(() => {
    if (password) {
      setPasswordStrength({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[@$!%*?&]/.test(password),
      });
    } else {
      setPasswordStrength({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      });
    }
  }, [password]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...submitData } = data;

      const res = await axios.post(
        "http://localhost:8000/customer/registration",
        submitData
      );

      if (res.data?.success) {
        // Attempt login after successful registration
        try {
          const loginRes = await axios.post(
            "http://localhost:8000/user/login",
            {
              email: submitData.email,
              password: submitData.password,
            }
          );

          if (loginRes.data?.success) {
            // Use toast for user feedback
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

            // Navigate after delay
            setTimeout(() => {
              navigate(
                loginRes.data.data.userType === 1
                  ? "/admin/dashboard"
                  : "/issues"
              );
            }, 2000);
          } else {
            throw new Error(loginRes.data.message || "Login failed");
          }
        } catch (loginError) {
          toast.error(loginError.message);
        }
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-teal-100 to-slate-100 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 py-6 px-6 text-center">
          <h2 className="text-white text-2xl font-bold">Create Your Account</h2>
          <p className="text-teal-100 text-sm mt-2 opacity-80">
            Join our platform with a secure account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-4">
          {/* Personal Information Section */}
          <div>
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
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters allowed",
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
          <div>
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
                    validate: () => {
                      const strength = Object.values(passwordStrength).filter(
                        (v) => v
                      ).length;
                      return (
                        strength >= 4 ||
                        "Password does not meet complexity requirements"
                      );
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
              {/* Password Strength Indicators */}
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  {passwordStrength.length ? (
                    <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  ) : (
                    <XCircle size={12} className="text-red-500 mr-1" />
                  )}
                  8+ characters
                </div>
                <div className="flex items-center">
                  {passwordStrength.uppercase ? (
                    <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  ) : (
                    <XCircle size={12} className="text-red-500 mr-1" />
                  )}
                  Uppercase letter
                </div>
                <div className="flex items-center">
                  {passwordStrength.lowercase ? (
                    <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  ) : (
                    <XCircle size={12} className="text-red-500 mr-1" />
                  )}
                  Lowercase letter
                </div>
                <div className="flex items-center">
                  {passwordStrength.number ? (
                    <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  ) : (
                    <XCircle size={12} className="text-red-500 mr-1" />
                  )}
                  Number
                </div>
                <div className="flex items-center col-span-2">
                  {passwordStrength.specialChar ? (
                    <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  ) : (
                    <XCircle size={12} className="text-red-500 mr-1" />
                  )}
                  Special character
                </div>
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
            disabled={isSubmitting || !isValid}
            className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
              isSubmitting || !isValid ? "opacity-75 cursor-not-allowed" : ""
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
