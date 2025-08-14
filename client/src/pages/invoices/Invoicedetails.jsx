import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth() ;

  // Fetch single invoice
  console.log("Access Token in InvoiceDetails:", accessToken);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchInvoice = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/invoices/${id}`,{
          headers: { Authorization: `Bearer ${accessToken}`},
        });
      setInvoice(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading invoice details...</p>;
  }

  if (!invoice) {
    return <p className="text-center text-red-500 mt-10">Invoice not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/user/invoices/mine")}
        className="flex items-center gap-2 mb-4 text-cyan-400 cursor-pointer hover:text-cyan-300"
      >
        <ArrowLeft size={18} /> Back to Invoices
      </button>

      {/* Invoice Header */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Invoice #{invoice._id.slice(-6)}</h1>
        <p><strong>Status:</strong> {invoice.ispaid ? "Paid" : "Unpaid"}</p>
        <p><strong>Total Amount:</strong> ₹{invoice.totalAmount}</p>
        <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Invoice Items */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-black/70 text-cyan-400">
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice.Items?.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceDetails;
