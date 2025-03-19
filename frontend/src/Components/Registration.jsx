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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registration, setRegistration] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data) => {
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
            setRegistration(true);
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Creating ...",
              success: "Account created successfully",
              error: "Something went wrong",
            });
               
            sessionStorage.setItem(
              "userData",
              JSON.stringify(loginRes.data.data)
            );
            sessionStorage.setItem("userId", loginRes.data.data._id);
            localStorage.setItem("token", loginRes.data.token);

            setTimeout(() => {
              navigate(loginRes.data.data.userType === 1 ? "/admin/dashboard" : "/");
            }, 2000);
          } else {
            toast.error(loginRes.data.message || "Login failed");
          }
        } catch (error) {
          toast.error("Login error: " + error.message);
        }
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-100 to-slate-100 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 py-8 px-6 text-center">
          <h2 className="text-white text-2xl font-bold">Sign Up</h2>
          <p className="text-blue-100 text-sm mt-2 opacity-80">
            Create your account in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">
          {/* Username Field */}
          <div>
            <div className="relative">
              <User
                size={18}
                className="absolute text-slate-400 left-3 top-3"
              />
              <input
                type="text"
                {...register("name", {
                  required: "Username required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  pattern: { value: /^[A-Za-z\s]+$/, message: "Letters only" },
                })}
                placeholder="Username"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border ${
                  errors.name ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <Mail
                size={18}
                className="absolute text-slate-400 left-3 top-3"
              />
              <input
                type="email"
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border ${
                  errors.email ? "border-red-600" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute text-slate-400 left-3 top-3"
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Must include: uppercase, lowercase, number, special character",
                  },
                })}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50 border ${
                  errors.password ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition`}
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
                  required: "Confirm password",
                  validate: (value) =>
                    value === password || "Passwords don't match",
                })}
                placeholder="Confirm password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50 border ${
                  errors.confirmPassword ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registration}
            className="w-full bg-pink-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            {registration ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <MoveRight size={18} />
            )}
            <span>
              {registration ? "Creating account..." : "Create Account"}
            </span>
          </button>

          <div className="text-center text-sm text-slate-500 pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
