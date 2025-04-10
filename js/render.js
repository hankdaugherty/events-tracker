export function renderEvents(events, container, onClick) {
  container.innerHTML = ""; // Clear previous

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>${event.date}</strong> @ ${event.time}</p>
      <p>${event.location}</p>
    `;

    card.addEventListener("click", () => onClick(event, event._id));
    container.appendChild(card);
  });
}

  
export function showModal(event, id) {
  console.log("Modal opened for ID:", id);

  document.getElementById("modal-title").textContent = event.title;
  document.getElementById("modal-date").textContent = event.date;
  document.getElementById("modal-time").textContent = event.time;
  document.getElementById("modal-location").textContent = event.location;
  document.getElementById("modal-description").textContent = event.description;

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  // Remove any existing delete button to avoid duplication
  const existingDeleteBtn = document.getElementById("modal-delete-btn");
  if (existingDeleteBtn) existingDeleteBtn.remove();

  if (localStorage.getItem("token")) {
    const modalContent = modal.querySelector(".modal-content");
  
    // Remove existing buttons if present
    document.getElementById("modal-delete-btn")?.remove();
    document.getElementById("modal-edit-btn")?.remove();
  
    // 🗑 DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "modal-delete-btn";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete Event";
  
    deleteBtn.addEventListener("click", async () => {
      const confirmed = confirm(`Delete "${event.title}"?`);
      if (!confirmed) return;
  
      try {
        const res = await fetch(`http://localhost:3000/api/events/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!res.ok) throw new Error("Failed to delete");
        modal.classList.add("hidden");
        window.location.reload();
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  
    // ✏️ EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.id = "modal-edit-btn";
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit Event";
  
    editBtn.addEventListener("click", () => {
      const form = document.getElementById("event-form");
    
      // Fill form with existing data
      form.title.value = event.title;
      form.date.value = event.date;
      form.time.value = event.time;
      form.location.value = event.location;
      form.description.value = event.description;
    
      // Set the event ID for update
      form.setAttribute("data-edit-id", id);
    
      // Update UI to reflect edit mode
      document.getElementById("form-mode-heading").textContent = "Edit Event";
      document.getElementById("submit-btn").textContent = "Update Event";
      document.getElementById("edit-indicator").classList.remove("hidden");
    
      // Close modal and scroll to form
      modal.classList.add("hidden");
      document.getElementById("add-event").scrollIntoView({ behavior: "smooth" });
    });
    
  
    modalContent.appendChild(editBtn);
    modalContent.appendChild(deleteBtn);
  }
  
}

  
  export function hideModal() {
    document.getElementById("modal").classList.add("hidden");
  }
  