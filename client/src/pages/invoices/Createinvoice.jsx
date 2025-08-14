import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    totalAmount: 0,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  // Calculate total
  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;

    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: calculateTotal(updatedItems),
    });
  };

  // Add new item
  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: calculateTotal(updatedItems),
    });
  };

  // Handle client name change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName.trim())
      newErrors.clientName = "Client name is required";
    if (
      formData.items.length === 0 ||
      formData.items.some(
        (item) => !item.description || item.quantity <= 0 || item.price <= 0
      )
    ) {
      newErrors.items =
        "Each item must have description, quantity > 0, and price > 0";
    }
    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post(
        "/api/invoices/",
        {
          clientName: formData.clientName,
          Items: formData.items,
          totalAmount: formData.totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      toast.success("Invoice created successfully!",{position:"top-center"});
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 5000); 

    } catch (error) {
      console.error("Error creating invoice:", error);
      setApiError(error.response?.data?.error || "Failed to create invoice");
      toast.error("Failed to create invoice", { position: "top-center" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>
      {apiError && <p className="text-red-500 text-sm mb-2">{apiError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name */}
        <div>
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          {errors.clientName && (
            <p className="text-red-500 text-xs">{errors.clientName}</p>
          )}
        </div>

        {/* Items Section */}
        <div>
          <h3 className="font-bold mb-2">Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="w-full sm:w-20 p-2 rounded bg-gray-800 border border-gray-700"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                className="w-full sm:w-24 p-2 rounded bg-gray-800 border border-gray-700"
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
          {errors.items && (
            <p className="text-red-500 text-xs">{errors.items}</p>
          )}
          <button
            type="button"
            onClick={addNewItem}
            className="mt-2 bg-purple-600 px-3 py-1 rounded cursor-pointer hover:bg-purple-700 text-sm"
          >
            + Add Item
          </button>
        </div>

        {/* Total */}
        <div>
          <p className="text-lg font-bold">
            Total: ₹{formData.totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 p-2 rounded font-bold"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;

