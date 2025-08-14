import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ Items: [], totalAmount: 0 });
  const { accessToken } = useAuth();
  const [error, setError] = useState("");

  // Fetch existing invoice
  const fetchInvoice = async () => {
    try {
      console.log("Fetching invoice with ID:", id);
      console.log("Access Token:", accessToken);

      const res = await axios.get(`/api/invoices/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setInvoice(res.data);
      setForm({
        Items: res.data.Items || [],
        totalAmount: res.data.totalAmount || 0,
      });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setError("Failed to load invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && accessToken) {
      fetchInvoice();
    }
  }, [id, accessToken]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.Items];
    updatedItems[index][field] =
      field === "description" ? value : parseFloat(value) || 0;

    setForm({
      ...form,
      Items: updatedItems,
      totalAmount: updatedItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      ),
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/invoices/${id}`, form, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success("Invoice updated successfully!",{position:"top-center"});
      setTimeout(() => {
      navigate("/user/invoices/mine");
    }, 4500);

    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Failed to update invoice. Please try again.",{position:"top-center"});
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading invoice...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!invoice) {
    return <p className="text-center text-red-500 mt-10">Invoice not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/user/invoices/mine")}
        className="flex items-center gap-2 mb-4 text-cyan-400 cursor-pointer hover:text-cyan-300"
      >
        <ArrowLeft size={18} /> Back to Invoices
      </button>

      <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Edit Invoice {invoice._id?.slice(-6)}
        </h1>

        {Array.isArray(form.Items) && form.Items.length > 0 ? (
          form.Items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
              <label className="block mb-2 text-sm">Description</label>
              <input
                type="text"
                value={item.description || ""}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              />

              <label className="block mb-2 text-sm">Quantity</label>
              <input
                type="number"
                value={item.quantity || 0}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              />

              <label className="block mb-2 text-sm">Price</label>
              <input
                type="number"
                value={item.price || 0}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No items found for this invoice.</p>
        )}

        <p className="mt-4 font-bold">Total: ₹{form.totalAmount}</p>

        <button
          onClick={handleSave}
          className="mt-4 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditInvoice;
