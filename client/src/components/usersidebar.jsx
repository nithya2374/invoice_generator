// src/components/UserSidebar.jsx
import { Link ,useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext"; 

const UserSidebar = () => {
  
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { user,logout } = useAuth();
  const navigate = useNavigate(); 

   const handleLogout = async () => {
    navigate("/"); // Redirect to login page
    await logout();
  };

  return (
    <>
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black p-6 text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        {/* Sidebar Heading with Home */}
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold mb-2 text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            User Panel
          </h1>
          <Link
            to="/user/home"
            onClick={closeSidebar}
            className="text-sm text-gray-300 hover:text-white inline-flex items-center gap-1"
          >
            🏡 Home
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/user/dashboard" onClick={closeSidebar} className="hover:text-purple-400">📊 Dashboard</Link>
          <Link to="/user/invoices/mine" onClick={closeSidebar} className="hover:text-purple-400">📄 Invoices</Link>
          <Link to="/user/invoices/create" onClick={closeSidebar} className="hover:text-purple-400">➕ Create Invoice</Link>
          <Link to="/user/profile" onClick={closeSidebar} className="hover:text-purple-400">👤 Profile</Link>
          
          {/* Logout Button */}
          <button
           onClick={() => {
             handleLogout();   // Calls your logout function
             closeSidebar();  // Closes the sidebar
           }}
          className="text-left hover:text-red-400 mt-5 md:hidden"
          >
          🚪 Logout
          </button>

        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
