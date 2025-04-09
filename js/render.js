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
      card.addEventListener("click", () => onClick(event));
      container.appendChild(card);
    });
  }
  
  export function showModal(event) {
    document.getElementById("modal-title").textContent = event.title;
    document.getElementById("modal-date").textContent = event.date;
    document.getElementById("modal-time").textContent = event.time;
    document.getElementById("modal-location").textContent = event.location;
    document.getElementById("modal-description").textContent = event.description;
    document.getElementById("modal").classList.remove("hidden");
  }
  
  export function hideModal() {
    document.getElementById("modal").classList.add("hidden");
  }
  