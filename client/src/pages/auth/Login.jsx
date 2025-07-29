import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
  const { email, password } = formData;

  if (!email || !password) {
    setMessage("Please fill in all fields.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address.");
    return false;
  }

  if (password.length < 5) {
    setMessage(" Password must be at least 5 characters.");
    return false;
  }

  return true;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setMessage("");
      const res = await login(formData);
      console.log("res: ",res)

      const userRole = res?.data?.user?.role || "user";

      localStorage.setItem("role", userRole);
      setMessage(" Login successfully!..");
      setMessageType("success");

      setTimeout(() => {
      if (userRole === "admin") {
         navigate("/admin/dashboard");
      } else {
         navigate("/user/home");
       }
      }, 4000);
      
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      setMessageType("error");
    }
  };

   useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);

    return () => clearTimeout(timer); 
  }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90 z-0"></div>

      {/* SVG Ripple Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10"
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="0.4" />
          <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="0.3" />
          <circle cx="400" cy="400" r="100" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back !</h2>

        {message && (
          <div className={`mb-4 text-bold text-sm p-3 rounded-md shadow-lg ${ messageType === "success"
        ? "text-green-600 bg-green-100"
        : "text-red-600 bg-red-100"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
