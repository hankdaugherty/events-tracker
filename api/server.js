const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Event = require("./models/Event");
const users = require("./data/users");
const authenticateToken = require("./middleware/auth");

const app = express();
const PORT = 3000;
const JWT_SECRET = "dev_secret_key"; // Use env vars in production

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/events_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Middleware
app.use(express.json());

// Routes
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/api/events", authenticateToken, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: "Failed to save event" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

app.delete("/api/events/:id", authenticateToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).end(); // No content
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

app.put("/api/events/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update event" });
  }
});


app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/api/events`);
});
