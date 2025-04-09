const mongoose = require("mongoose");
const Event = require("./models/Event");

mongoose.connect("mongodb://localhost:27017/events_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedEvents = [
  {
    title: "Hyattsville Arts Festival",
    date: "2025-04-20",
    time: "12:00 PM",
    location: "Downtown Hyattsville, MD",
    description: "A vibrant showcase of local artists, food vendors, and live music."
  },
  {
    title: "Tech Talk: Future of 5G",
    date: "2025-04-22",
    time: "6:00 PM",
    location: "ATIS HQ, Washington, DC",
    description: "Industry leaders share insights on 5G and beyond."
  },
  {
    title: "Farmers Market Weekend",
    date: "2025-04-27",
    time: "11:00 AM",
    location: "Riverdale Park",
    description: "Fresh produce, handmade crafts, and family-friendly activities."
  },
  {
    title: "Town Session",
    date: "2025-04-27",
    time: "3:00 PM",
    location: "Town Center Market, Riverdale Park",
    description: "IPAs and Skip Bo and Monopoly!"
  }
];

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected, seeding data...");
  await Event.deleteMany({});
  await Event.insertMany(seedEvents);
  console.log("Seeding complete.");
  mongoose.disconnect();
});
