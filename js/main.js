import { renderEvents, showModal, hideModal } from "./render.js";

const container = document.getElementById("events-container");

// Fetch event data from JSON file
async function loadEvents() {
  try {
    const res = await fetch("./data/events.json");
    if (!res.ok) throw new Error("Network response was not ok");
    const events = await res.json();
    renderEvents(events, container, showModal);
  } catch (err) {
    container.innerHTML = `<p class="error">Failed to load events: ${err.message}</p>`;
  }
}

loadEvents();

document.getElementById("close-btn").addEventListener("click", hideModal);