import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, MoveRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", data);

      setLogin(true);
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
        {
          loading: "Logging ...",
          success: "Logged In Successfully!",
          error: "Login failed",
        }
      );
      if (res.data.success === true) {
        sessionStorage.setItem("userData", JSON.stringify(res.data.data));
        sessionStorage.setItem("userId", res.data.data._id);
        sessionStorage.setItem("token", res.data.token);

        setTimeout(() => {
          navigate(res.data.data.userType === 1 ? "/admin/dashboard" : "/");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-100 to-slate-100 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 py-8 px-6 text-center">
          <h2 className="text-white text-2xl font-bold">Login</h2>
          <p className="text-white text-lg mt-2 opacity-80">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">
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
                  errors.email ? "border-red-300" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

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

          <div className="pt-2">
            <button
              disabled={login}
              type="submit"
              className={`w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition duration-200 ${
                login ? "bg-pink-50 cursor-not-allowed" : ""
              }`}
            >
              {login ? (
                <>
                  <span>Logging</span>
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>Login</span>
                  <MoveRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="text-center text-sm text-slate-500 pt-4">
            Not an account?{" "}
            <Link
              to="/registration"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
