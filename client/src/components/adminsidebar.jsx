import { Link } from "react-router-dom";

const AdminSidebar = () => (
  <aside className="w-64 bg-gray-950 p-5 text-white">
    <h2 className="text-xl font-bold mb-6">🛠 Admin Panel</h2>
    <nav className="flex flex-col gap-4 text-gray-300">
      <Link to="/admin/dashboard" className="hover:text-white">📊 Dashboard</Link>
      <Link to="/admin/users" className="hover:text-white">👥 Users</Link>
      <Link to="/admin/invoices" className="hover:text-white">📄 Invoices</Link>
    </nav>
  </aside>
);

export default AdminSidebar;
