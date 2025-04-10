# Local Events Tracker

A modular full-stack web application for browsing and managing local events. Built in progressive stages using modern technologies.


## Features

- Responsive, mobile-friendly layout
- Modular JavaScript using ES Modules
- Dynamic event loading via RESTful API
- MongoDB-backed data persistence
- User authentication (JWT-based)
- Protected admin-only event creation and deletion
- In-progress event editing functionality
- Modern UI with modal interactions
---

## Project Structure

```bash
events-tracker/ 
├── index.html 
├── styles.css 
└── js/ 
│ └── main.js 
│ └── render.js
├── api/ 
│ └── server.js
│ └── models/
│ │   └── Event.js
│ └── middleware/
│ │   └── auth.js
```

---

## Setup & Run Locally

### Prerequisites
- Git
- Node.js + npm
- Python 3 (for static frontend server)
- MongoDB (or MongoDB Atlas)


### Steps

```bash
# Clone repo
git clone git@github.com:hankdaugherty/events-tracker.git
cd events-tracker

# Start backend API
cd api
npm install
node server.js

# In a separate terminal, serve frontend
cd ../
python3 -m http.server

```
- Visit http://localhost:3000 - API
- Visit http://localhost:8000 - Frontend

---

## Roadmap

This project is being developed in progressive full stack stages.

### Complete
- Static HTML/CSS MVP
- Modular JavaScript frontend
- Express + MongoDB backend
- Admin login with JWT
- Event creation + deletion

### In Progress
- Event editing with prefill + dynamic form state
- Frontend migration to React with Vite
- Full CI/CD deployment via Render
- User roles and ownership tags
- Image uploads and media embedding

---

## License
MIT – Free to use, fork, and adapt.

