const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // ✅ import the model
const Event = require("./models/Event");
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
    const event = new Event({
      ...req.body,
      createdBy: req.user.username, // 👈 Set creator
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: "Failed to save event" });
  }
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const existing = await User.findOne({ username });
  if (existing)
    return res.status(409).json({ error: "Username already exists" });

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({ username, passwordHash });
  await user.save();

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});


app.post("/api/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(currentPassword, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

app.delete("/api/events/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.createdBy && event.createdBy !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized to update this event" });
    }

    await event.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});


app.put("/api/events/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.createdBy && event.createdBy !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized to update this event" });
    }

    Object.assign(event, req.body);
    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update event" });
  }
});




app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/api/events`);
});
