// src/pages/user/UserHome.jsx
const UserHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create Invoice Card */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition-all">
        <h2 className="text-xl font-bold mb-2">+ Create New Invoice</h2>
        <p className="text-sm">Quickly generate a new invoice and send it.</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
        <h2 className="text-xl font-bold mb-2">🕒 Recent Activities</h2>
        <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
          <li>Invoice #1234 created</li>
          <li>Profile updated</li>
          <li>Logged in yesterday</li>
        </ul>
      </div>

      {/* Profile Overview */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
        <h2 className="text-xl font-bold mb-2">👤 Profile Info</h2>
        <p className="text-sm text-gray-300">Name: Nithya Sri</p>
        <p className="text-sm text-gray-300">Email: 21ds016@example.com</p>
      </div>
    </div>
  );
};

export default UserHome;
