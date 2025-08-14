// src/pages/user/dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [recentInvoices, setRecentInvoices] = useState([]);
  const { user,accessToken } = useAuth();
  const [totalInvoicesCount, setTotalInvoicesCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null); // local profile state
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const navigate = useNavigate();

  // Fetch last 3 invoices from API
  const fetchRecentInvoices = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/invoices/`, {headers:{Authorization: `Bearer ${accessToken}`}});
      const invoices = Array.isArray(res.data) 
      ? res.data 
      : res.data.invoices || []; // fallback if invoices are nested
      
      const sortedInvoices = invoices.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTotalInvoicesCount(sortedInvoices.length); 
      setRecentInvoices(sortedInvoices.slice(0, 3));
      calculateRevenue(sortedInvoices);

    } catch (error) {
      console.error("Error fetching invoices:", error);
      setRecentInvoices([]); 
      setTotalInvoicesCount(0);
    }
  };

  // Calculate revenue for this month and last month
  const calculateRevenue = (invoices) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    invoices.forEach(inv => {
      const date = new Date(inv.createdAt);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        thisMonthTotal += inv.totalAmount || 0;
      } else if (date.getMonth() === currentMonth - 1 && date.getFullYear() === currentYear) {
        lastMonthTotal += inv.totalAmount || 0;
      }
    });

    setThisMonthRevenue(thisMonthTotal);
    setLastMonthRevenue(lastMonthTotal);
  };

  // Fetch full user profile from getMe
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserProfile(res.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchRecentInvoices();
    fetchUserProfile();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Create Invoice Card */}
      <div
        onClick={() => navigate("/user/invoices/create")}
        className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-2xl p-6 cursor-pointer shadow-lg transform hover:scale-105 transition-all cursor-pointer"
      >
        <h2 className="text-xl font-bold mb-2 text-white">+ Create New Invoice</h2>
        <p className="text-sm text-gray-200 ">Quickly generate a new invoice and send it.</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 cursor-pointer rounded-2xl shadow-lg transform hover:scale-105 transition-all">
        <h2 className="text-xl font-bold mb-2 text-white">🕒 Recent Activities</h2>
        <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
          {recentInvoices.length > 0 ? (
            recentInvoices.map((invoice) => (
              <li key={invoice._id} className="truncate">
                Invoice {invoice.Items[0]?.description || "Unnamed Item"} - ₹{invoice.totalAmount || 0} -{" "}
                {invoice.isPaid ? "Paid" : "Unpaid"}
              </li>
            ))
          ) : (
            <li>No recent invoices</li>
          )}
        </ul>
      </div>

      {/* Profile Overview */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-6 cursor-pointer rounded-2xl shadow-lg transform hover:scale-105 transition-all">
        <h2 className="text-xl font-bold mb-2 text-white">👤 Profile Info</h2>
        <p className="text-sm text-gray-300">Name: {userProfile?.name || "User"}</p>
        <p className="text-sm text-gray-300">Email: {userProfile?.email || "N/A"}</p>
        <p className="text-sm text-gray-300">BusinessName: {userProfile?.businessName?.trim() || "N/A"}</p>
        <p className="text-sm text-gray-300">country: { userProfile?.country?.trim() || "N/A"} </p>
      </div>

      {/* Total Invoices Card */}
     <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 cursor-pointer rounded-2xl shadow-lg transform hover:scale-105 transition-all">
       <h2 className="text-xl font-bold mb-2 text-white">📄 Total Invoices</h2>
       <p className="text-2xl font-semibold text-white">
             {totalInvoicesCount} {/* Real total count */}
       </p>
    </div>

     <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-6 cursor-pointer rounded-2xl shadow-lg transform hover:scale-105 transition-all">
       <h3 className="text-lg font-semibold text-white-800"> 💰 Revenue Summary </h3>
        <p className="text-sm text-purple-200 mt-1">This Month:   ₹{thisMonthRevenue}</p>
        <p className="text-sm text-purple-200 mt-1">Last Month:   ₹{lastMonthRevenue}</p>
    </div>

    </div>
  );
};

export default Dashboard;
