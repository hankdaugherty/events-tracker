import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function EventList({ token, onSelect }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} onClick={() => onSelect(event)} />
      ))}
    </div>
  );
}
