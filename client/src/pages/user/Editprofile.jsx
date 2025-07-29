import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    contact: "9876543210",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    navigate("/profile"); // redirect back to profile page
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={profile.name} onChange={handleChange} />
        <input name="email" value={profile.email} onChange={handleChange} />
        <input name="contact" value={profile.contact} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
