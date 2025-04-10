import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Login({ onLogin, onSwitchToSignup }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      const user = { token: data.token, username: form.username };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 w-full max-w-sm mx-auto"
    >
      <input
        className="border border-gray-300 rounded px-3 py-2 w-full"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        className="border border-gray-300 rounded px-3 py-2 w-full"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Login
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign up here
        </button>
      </p>
    </form>
  );
}
