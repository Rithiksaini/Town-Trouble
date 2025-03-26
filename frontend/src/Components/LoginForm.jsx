import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  MoveRight,
  Loader2,
  Building2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoggingIn(true);
      const res = await axios.post("http://localhost:8000/user/login", data);

      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (res.data.success === true) {
              resolve();
            } else {
              reject();
            }
          }, 1500);
        }),
        {
          loading: "Logging in...",
          success: "Welcome back to Town Trouble!",
          error: "Login failed",
        }
      );

      if (res.data.success === true) {
        // Store user data
        sessionStorage.setItem("userData", JSON.stringify(res.data.data));
        sessionStorage.setItem("userId", res.data.data._id);
        sessionStorage.setItem("token", res.data.token);

        // Redirect after animation completes
        setTimeout(() => {
          navigate(
            res.data.data.userType === 1 ? "/admin/dashboard" : "/issues"
          );
        }, 2000);
      } else {
        setIsLoggingIn(false);
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setIsLoggingIn(false);
      console.error("Login error:", err);
      toast.error(
        err.response?.data?.message || "Connection error. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-slate-100 to-blue-50 flex items-center justify-center p-4 font-sans">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 py-10 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 Z" fill="#fff"></path>
            </svg>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Building2 size={32} className="text-white mr-2" />
            <h1 className="text-white text-3xl font-bold">Town Trouble</h1>
          </div>

          <h2 className="text-white text-xl font-medium">Welcome Back</h2>
          <p className="text-white text-sm mt-2 opacity-80">
            Login to manage community issues
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">
          <div>
            <div className="relative group">
              <Mail
                size={18}
                className="absolute text-slate-400 left-3 top-3 group-focus-within:text-teal-500 transition-colors duration-200"
              />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border ${
                  errors.email ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all duration-200`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-1.5"></span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative group">
              <Lock
                size={18}
                className="absolute text-slate-400 left-3 top-3 group-focus-within:text-teal-500 transition-colors duration-200"
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-lg bg-slate-50 border ${
                  errors.password ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-teal-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-1.5"></span>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-teal-500 mr-2 focus:ring-teal-500"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
            >
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <button
              disabled={isLoggingIn}
              type="submit"
              className={`w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 duration-200 ${
                isLoggingIn ? "opacity-90 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? (
                <>
                  <span>Logging in</span>
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>Login to Town Trouble</span>
                  <MoveRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 rounded-lg flex items-center justify-center transition duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg flex items-center justify-center transition duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.552 21.128 10.225 21.88V14.709H7.797V12H10.225V9.789C10.225 7.347 11.594 6.031 13.825 6.031C14.896 6.031 16.029 6.203 16.029 6.203V8.562H14.799C13.586 8.562 13.146 9.333 13.146 10.125V12H15.914L15.405 14.709H13.146V21.88C17.818 21.129 21.37 16.99 21.37 12C21.37 6.477 16.893 2 12 2Z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="text-center text-sm text-slate-600 pt-4">
            New to Town Trouble?{" "}
            <Link
              to="/registration"
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
