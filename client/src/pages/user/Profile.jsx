import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    contactNumber: "",
    country: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const { accessToken } = useAuth();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        setError("");
        const res = await axios.get("/api/auth/me",{
           headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(res.data);
        setForm({
          name: res.data.name || "",
          businessName: res.data.businessName || "",
          contactNumber: res.data.contactNumber || "",
          country: res.data.country || ""
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      setError("");
      const res = await axios.put(`/api/user/update-profile/${user.id}`, form,{
          headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(res.data.user);
      setForm({
        name: res.data.user.name || "",
        businessName: res.data.user.businessName || "",
        contactNumber: res.data.user.contactNumber || "",
        country: res.data.user.country || ""
      });
      setEditing(false);
      toast.success("Profile updated successfully!");

    } catch (err) {

      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
      toast.error("Failed to update profile.");

    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name || "",
      businessName: user.businessName || "",
      contactNumber: user.contactNumber || "",
      country: user.country || ""
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Always read-only */}
      <ProfileRow label="User ID" value={user.id} mono />
      <ProfileRow label="Email" value={user.email} />
      <ProfileRow label="Role" value={user.role} />
      <ProfileRow
        label="Account Created"
        value={user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "-"}
      />

      <hr className="my-6 border-gray-700" />

      {/* Editable or view-only fields */}
      {editing ? (
        <form className="space-y-4">
          <ProfileInput label="Name" name="name" value={form.name} onChange={handleChange} />
          <ProfileInput label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} />
          <ProfileInput label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
          <ProfileInput label="Country" name="country" value={form.country} onChange={handleChange} />

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-700 cursor-pointer hover:bg-gray-600 text-white font-semibold py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <ProfileRow label="Name" value={user.name} />
          <ProfileRow label="Business Name" value={user.businessName} />
          <ProfileRow label="Contact Number" value={user.contactNumber} />
          <ProfileRow label="Country" value={user.country} />
          
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-6"
          >
            Edit
          </button>
          
        </>
      )}
    </div>
  );
}

function ProfileRow({ label, value, mono }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`${mono ? "font-mono" : ""} text-white`}>{value || "-"}</p>
    </div>
  );
}

function ProfileInput({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-300">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
