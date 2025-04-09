import { renderEvents, showModal, hideModal } from "./render.js";

const container = document.getElementById("events-container");

// Fetch event data from JSON file
async function loadEvents() {
  try {
    const res = await fetch("http://localhost:3000/api/events");
    if (!res.ok) throw new Error("Network response was not ok");
    const events = await res.json();
    renderEvents(events, container, showModal);
  } catch (err) {
    container.innerHTML = `<p class="error">Failed to load events: ${err.message}</p>`;
  }
}

loadEvents();

document.getElementById("close-btn").addEventListener("click", hideModal);

const form = document.getElementById("event-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const event = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });

    if (!res.ok) throw new Error("Failed to create event");

    form.reset();

    // Reload events
    loadEvents();
  } catch (err) {
    alert("Error: " + err.message);
  }
});
