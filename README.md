# Local Events Tracker

A modular, front-end JavaScript application for browsing and exploring local events.


### Live Demo

- [View on GitHub Pages](https://hankdaugherty.github.io/events-tracker/)
- [View on Netlify](https://harmonious-lollipop-50000a.netlify.app/)

---

## Features

- Responsive, mobile-friendly layout
- Modular JavaScript using ES Modules
- Dynamic event loading via JSON API (fetch)
- Interactive event cards with modal detail views
- Clean, modern UI using vanilla CSS

---

## Project Structure

```bash
events-tracker/ 
├── index.html 
├── styles.css 
├── data/ 
│ └── events.json 
└── js/ 
│ └── main.js 
│ └── render.js
```

---

## Setup & Run Locally

### Prerequisites
- Git
- Python 3 (for static server)
- A modern browser


### Steps

```bash
git clone git@github.com:hankdaugherty/events-tracker.git
cd events-tracker
python3 -m http.server
```
Visit http://localhost:8000 in your browser.

---

## Roadmap

This project is being developed in progressive full stack stages. Upcoming milestones:

### Complete
- Static HTML/CSS MVP  
- Modular JavaScript  
- JSON-based API-driven frontend  

### In Progress
- Express.js backend with REST API  
- MongoDB data storage  
- User authentication  
- React-based frontend  
- Full deployment pipeline (CI/CD)

---

## License
MIT – Free to use, fork, and adapt.

