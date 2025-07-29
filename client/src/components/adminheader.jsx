import { Menu } from "lucide-react"; // You can also use any icon library
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const AdminHeader = ({ onMenuClick }) => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/"); // Redirect to login page
    await logout();
  };

  return (
    <header className="bg-gray-950 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        <button onClick={onMenuClick} className="md:hidden text-white">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold">Welcome, Admin 👋</h1>
      </div>
      <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
