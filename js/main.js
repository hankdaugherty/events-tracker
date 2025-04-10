import { renderEvents, showModal, hideModal } from "./render.js";

const container = document.getElementById("events-container");
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const loginStatus = document.getElementById("login-status");
const addEventSection = document.getElementById("add-event");
const form = document.getElementById("event-form");
const formHeading = document.getElementById("form-mode-heading");
const submitBtn = document.getElementById("submit-btn");
const editIndicator = document.getElementById("edit-indicator");
const logoutBtn = document.getElementById("logout-btn");


// 🔁 Load events
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

// ✅ Restore login state on page load
const token = localStorage.getItem("token");
if (token) {
  loginSection.classList.remove("hidden"); // keep this section visible (so status + logout show)
  loginForm.classList.add("hidden");       // hide the actual login inputs
  addEventSection.classList.remove("hidden");
  loginStatus.textContent = "✅ Admin is signed in";
  loginStatus.style.color = "green";
  logoutBtn.classList.remove("hidden");
} else {
  loginSection.classList.remove("hidden");
  loginForm.classList.remove("hidden");
  addEventSection.classList.add("hidden");
  logoutBtn.classList.add("hidden");
}


// 🔐 Handle login form submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const credentials = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    loginForm.reset();
    loginForm.classList.add("hidden");                     // hide just the form
    addEventSection.classList.remove("hidden");            // show event form
    loginStatus.textContent = `✅ ${credentials.username} is signed in`;
    loginStatus.style.color = "green";
    logoutBtn.classList.remove("hidden");                  // show logout button
    
  } catch (err) {
    loginStatus.textContent = `❌ ${err.message}`;
    loginStatus.style.color = "red";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  loginSection.classList.remove("hidden");
  loginForm.classList.remove("hidden");
  addEventSection.classList.add("hidden");
  loginStatus.textContent = "";
  logoutBtn.classList.add("hidden");
});

// ➕ Handle event submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const event = Object.fromEntries(formData.entries());
  const token = localStorage.getItem("token");
  const editId = form.getAttribute("data-edit-id");
  const method = editId ? "PUT" : "POST";
  const endpoint = editId
    ? `http://localhost:3000/api/events/${editId}`
    : `http://localhost:3000/api/events`;

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to submit event");
    }

    form.reset();
    form.removeAttribute("data-edit-id"); // Clear edit state
    formHeading.textContent = "Add New Event";
    submitBtn.textContent = "Add Event";
    editIndicator.classList.add("hidden");
    loadEvents();
  } catch (err) {
    alert("Error: " + err.message);
  }
});


// ❌ Close modal
document.getElementById("close-btn").addEventListener("click", hideModal);
