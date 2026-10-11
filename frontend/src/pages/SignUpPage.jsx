import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { User, Mail, Lock, Loader } from "lucide-react";

export default function SignUpPage() {
  const { register, isLoggedIn } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your details below to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
                value={formData.fullName}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                value={formData.email}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={formData.password}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex justify-center items-center bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg text-sm transition"
          >
           {isLoggedIn? <Loader className="animate-spin"/>: "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-black font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}