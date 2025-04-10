# Local Events Tracker

A full-stack web application for browsing and managing local events. Built incrementally with modern tools including **Express**, **MongoDB**, **JWT authentication**, and a **React + Tailwind CSS** frontend.


## Features

- Mobile-friendly, responsive layout
- React frontend with Tailwind CSS
- Modular backend (Express + MongoDB)
- RESTful API for CRUD operations
- Secure user authentication (JWT)
- Password change and signup support
- Modal UI for viewing/editing events
- Per-user event ownership and permissions
---

## Project Structure

```bash
events-tracker/ 
├── index.html 
├── styles.css 
└── js/ 
│ └── main.js 
│ └── render.js
├── api/ # Express + MongoDB backend
│ └── server.js
│ └── models/
│ │   └── Event.js
│ │   └── User.js
│ └── middleware/
│ │   └── auth.js
│ └── scripts/
│ │   └── seed-user.js
├── events-tracker-react/ # React frontend (Vite + Tailwind)
│ └── src/
│ │   └── App.jsx
│ │   └── main.jsx
│ └── components/
│ │   └── Login.jsx
│ │   └── Signup.jsx
│ │   └── EventList.jsx
│ │   └── EventForm.jsx
│ │   └── Modal.jsx
│ │   └── ChangePassword.jsx
│ └── tailwind.config.js
```

---

## Setup & Run Locally

### Prerequisites
- Node.js + npm
- MongoDB (local or Atlas)
- Git

### Backend (API)
```bash
cd api
npm install
node server.js
```

### Frontend (React + Vite)
```bash
cd events-tracker-react
npm install
npm run dev
```

- API runs at http://localhost:3000
- React app runs at http://localhost:5173

To seed an initial admin user, run: node scripts/seed-user.js

---

## Roadmap

This project is being developed in progressive full stack stages.

### Complete
- REST API with MongoDB
- JWT-based login/logout flow
- Event creation, editing, deletion
- React frontend migration
- User ownership on events
- Password change support

### In Progress
- Media upload for events
- CI/CD deployment via Render/Vercel
- Admin role support
- Public view mode (unauthenticated)

---

## License
MIT – Free to use, fork, and adapt.

