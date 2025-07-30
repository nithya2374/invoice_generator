import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageType, setMessageType] = useState("error");
  const [ errors,setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    contactNumber: "",
    country: "",
  });

  const validateForm = () => {
  const newErrors = {};

  if (!form.name || form.name.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email address";
  }

  if (!form.password || form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (!form.businessName) {
    newErrors.businessName = "Business name is required";
  }

  if (!form.contactNumber || !/^\d{10}$/.test(form.contactNumber)) {
    newErrors.contactNumber = "Contact number must be 10 digits";
  }

  if (!form.country) {
    newErrors.country = "Country is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
    setMessage(""); // Clear backend/global error
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${API_URL}/api/auth/signup`, form, { withCredentials: true });
    
        navigate("/login");
    

    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setErrors(backendErrors);
      }
      setMessageType("error");
      setMessage(err.response?.data?.message || "Signup failed");
      
    }
  };

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

  {/* Signup Card */}
  <div className="relative z-10 w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
    <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Your Account</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        ["name", "Name"],
        ["email", "Email"],
        ["password", "Password", "password"],
        ["businessName", "Business Name"],
        ["contactNumber", "Contact Number"],
        ["country", "Country"],
      ]
      .map(([key, label, type = "text"]) => key === "password" ? (
      <div key={key} className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={key}
        placeholder={label}
        value={form[key]}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {errors[key] && (<p className="text-red-500 text-sm mt-1">{errors[key]}</p>)}

      <div
        className="absolute top-2.5 right-3 text-gray-400 hover:text-white cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </div>
    </div>
  ):(  <div key={key}>
        <input
          key={key}
          type={type}
          name={key}
          placeholder={label}
          value={form[key]}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors[key] && ( <p className="text-red-500 text-sm mt-1">{errors[key]}</p>)}
        </div>
      ))}

       {message && (
         <p className={`text-sm mt-2 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300"
      >
        Sign Up
      </button>
    </form>

    <p className="mt-4 text-sm text-center text-gray-400">
      Already have an account?{" "}
      <Link to="/login" className="text-indigo-400 hover:text-indigo-200">
        Login
      </Link>
    </p>

  </div>
</div>
  )
};

export default Signup;
