import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ChangePassword({ token, onClose }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ new

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password change failed");

      setSuccess(true); // ✅ hide form, show success
      setForm({ currentPassword: "", newPassword: "" });

      setTimeout(() => onClose(), 2000); // ✅ delay close
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      {success ? (
        <p className="text-green-700 text-center text-lg font-semibold">
          ✅ Password successfully changed!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Change Password
          </h3>
          <input
            className="w-full border p-2 rounded"
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            required
            autoComplete="current-password" // optional tweak
          />
          <input
            className="w-full border p-2 rounded"
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            autoComplete="new-password" // optional tweak
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
}
