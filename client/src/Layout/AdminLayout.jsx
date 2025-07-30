import { useState , useEffect} from "react";
import AdminSidebar from "../components/adminsidebar";
import AdminHeader from "../components/adminheader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    navigate("/login");
  }
}, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
       <>
        {/* Overlay */}
       <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
       />

       {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-gray-950 shadow-xl z-50 text-white md:hidden">
           <AdminSidebar />
        </div>
        </>
      )}

      <div className="flex flex-col flex-1">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
