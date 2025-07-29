// src/layouts/UserLayout.jsx
import UserSidebar from "../components/usersidebar";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <UserSidebar/>
      <div className="flex-1 flex flex-col">
        <Header/>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
