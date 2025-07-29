const AdminDashboard = () => {
  const stats = {
    totalUsers: 15,
    totalInvoices: 28,
    paidInvoices: 17,
    unpaidInvoices: 11,
    revenue: "₹42,000",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Dashboard Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Invoices" value={stats.totalInvoices} />
        <StatCard label="Revenue" value={stats.revenue} />
        <StatCard label="Paid Invoices" value={stats.paidInvoices} />
        <StatCard label="Unpaid Invoices" value={stats.unpaidInvoices} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
    <h3 className="text-gray-400 text-sm">{label}</h3>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
