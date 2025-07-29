// src/components/Header.jsx
import { User, LogOut, Menu, X } from "lucide-react";
import { useState} from "react";
import { useSidebar } from "../context/SidebarContext"; 
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSidebar } = useSidebar(); 
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/"); // Redirect to login page
    await logout();
  };

  return (
    <header className="w-full px-6 py-4 bg-black/70 backdrop-blur-md text-white flex justify-between items-center border-b border-cyan-500 shadow-lg z-50">
      {/* Left - Hamburger + Title */}
      <div className="flex items-center gap-3">
     {/* Hamburger Icon for Sidebar Toggle */}
    <button
         onClick={toggleSidebar}
         className="md:hidden text-white"
     >
         <Menu size={26} />
     </button>

    <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Welcome, Nithya!
     </h2>
    </div>

      {/* Right - Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-4 py-2 rounded-xl text-sm transition duration-300">
          <User size={18} /> Profile
        </button>
        <button  onClick={handleLogout} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:brightness-110 px-4 py-2 rounded-xl text-sm transition duration-300" >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Mobile - Hamburger Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => 
             setIsMobileMenuOpen(!isMobileMenuOpen)
          }
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-black/90 border border-cyan-500 backdrop-blur-lg rounded-xl shadow-xl p-4 flex flex-col gap-3 w-44 md:hidden animate-slide-in">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-4 py-2 rounded-lg text-sm">
            <User size={18} /> Profile
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:brightness-110 px-4 py-2 rounded-lg text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
