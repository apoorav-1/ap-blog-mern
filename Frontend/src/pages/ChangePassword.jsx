import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../context/Context";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Hits your backend user update route (adjust path if your endpoint is /users/profile or similar)
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/${user._id}`,
        {
          userId: user._id,
          password: newPassword,
          currentPassword: currentPassword // optional: pass if your backend validates current password first
        },
        {
          headers: { token: `Bearer ${user.token}` },
        }
      );
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 bg-base-200/40 border border-base-200 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-base-content mb-6">Change Password</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-control">
          <label className="label text-sm font-semibold text-base-content/70">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="input input-bordered w-full bg-transparent focus:outline-none focus:border-primary"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label text-sm font-semibold text-base-content/70">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="input input-bordered w-full bg-transparent focus:outline-none focus:border-primary"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-error text-sm mt-1">{error}</p>}
        {success && <p className="text-success text-sm mt-1">{success}</p>}

        <button 
          type="submit" 
          className={`btn btn-primary w-full mt-2 ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;