// src/components/Header.jsx
import { User, LogOut, Menu, X } from "lucide-react";
import { useState} from "react";
import { useSidebar } from "../context/SidebarContext"; 
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSidebar } = useSidebar(); 
  const { user,logout } = useAuth();
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
        Welcome,{user?.name}!
     </h2>
    </div>

      {/* Right - Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button  onClick={handleLogout} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:brightness-110 px-4 py-2 rounded-xl text-sm transition duration-300" >
          <LogOut size={18} /> Logout
        </button>
      </div>
      
    </header>
  );
};

export default Header;
