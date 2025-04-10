import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function EventForm({ user, editEvent, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editEvent) {
      setForm({
        title: editEvent.title || "",
        date: editEvent.date || "",
        time: editEvent.time || "",
        location: editEvent.location || "",
        description: editEvent.description || "",
      });
    }
  }, [editEvent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      createdBy: user.username, // ✅ attach current user
    };

    const url = editEvent
      ? `${API}/api/events/${editEvent._id}`
      : `${API}/api/events`;

    const method = editEvent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setForm({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });

      onSubmit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {editEvent ? "Edit Event" : "Add New Event"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded col-span-full"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-600 text-sm">❌ {error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editEvent ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}
