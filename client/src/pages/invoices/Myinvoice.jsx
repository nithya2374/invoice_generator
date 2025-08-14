import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Edit, Trash, Download } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const MyInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);


  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      const res = await axios.get("/api/invoices/",{
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Delete an invoice
  const deleteInvoice = async (id) => {
    
    try {
      await axios.delete(`/api/invoices/${selectedInvoiceId}`,{
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      fetchInvoices(); // Refresh after delete
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  // Download invoice PDF
  const downloadPDF = async (id) => {
    try {
      const res = await axios.get(`/api/invoices/${id}/pdf`, { 
          responseType: "blob" ,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

      const url = window.URL.createObjectURL(new Blob([res.data],{ type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <>

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Invoices</h1>

      <div className="hidden md:block overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-black/70 text-cyan-400">
              <th className="p-3 text-left">Invoice ID</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice._id} className="border-b border-gray-700">
                  <td className="p-3">{invoice._id.slice(-4)}</td>
                  <td className="p-3">{invoice.Items?.[0]?.description|| "N/A"}</td>
                  <td className="p-3">₹{invoice.totalAmount}</td>
                  <td className="p-3">{invoice.ispaid ? "Paid" : "Unpaid"}</td>
                  <td className="p-3">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/user/invoices/${invoice._id}`)}
                      className="bg-blue-600 px-3 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-700"
                    >
                      <FileText size={16} /> View
                    </button>
                    <button
                      onClick={() => navigate(`/user/invoices/edit/${invoice._id}`)}
                      className="bg-green-600 px-3 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-green-700"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInvoiceId(invoice._id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 px-3 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-red-700"
                    >
                      <Trash size={16} /> Delete
                    </button>
                    <button
                      onClick={() => downloadPDF(invoice._id)}
                      className="bg-purple-600 px-3 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-purple-700"
                    >
                      <Download size={16} /> PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center text-gray-400" colSpan="6">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>

    { /* Mobile & Tablet View (Card Layout) */}
<div className="grid gap-4 md:hidden">
  { invoices.length > 0 ? (
    invoices.map((invoice) => (
      <div
        key={invoice._id}
        className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            #{invoice._id.slice(-4)}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${
              invoice.ispaid
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {invoice.ispaid ? "Paid" : "Unpaid"}
          </span>
        </div>
        <p className="text-cyan-400 font-semibold">
          {invoice.Items?.[0]?.description || "N/A"}
        </p>
        <p className="text-white font-bold mt-1">₹{invoice.totalAmount}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(invoice.createdAt).toLocaleDateString()}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => navigate(`/user/invoices/${invoice._id}`)}
            className="bg-blue-600 px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700 text-sm"
          >
            <FileText size={14} /> View
          </button>
          <button
            onClick={() => navigate(`/user/invoices/edit/${invoice._id}`)}
            className="bg-green-600 px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700 text-sm"
          >
            <Edit size={14} /> Edit
          </button>
          <button
            onClick={() => {
              setSelectedInvoiceId(invoice._id);
              setShowDeleteModal(true);
            }}
            className="bg-red-600 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 text-sm"
          >
            <Trash size={14} /> Delete
          </button>
          <button
            onClick={() => downloadPDF(invoice._id)}
            className="bg-purple-600 px-3 py-1 rounded flex items-center gap-1 hover:bg-purple-700 text-sm"
          >
            <Download size={14} /> PDF
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 text-center">No invoices found</p>
  )}
</div>
  </div>

  {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-2xl w-96">
      
      {/* Warning Icon */}
      <div className="flex justify-center mb-4">
        <svg
          className="w-14 h-14 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5.07c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-2 text-cyan-400">
        Confirm Deletion
      </h2>

      {/* Message */}
      <p className="text-gray-300 text-center mb-6">
        Are you sure you want to delete this invoice? This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-5 py-2 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
        >
          Cancel
        </button>
        <button
          onClick={deleteInvoice}
          className="px-5 py-2 cursor-pointer rounded bg-red-600 hover:bg-red-700 text-white font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

 </>
);

};

export default MyInvoices;
