import { useState, useRef } from "react";
import { LogOut } from "lucide-react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Modal from "./components/Modal";
import ChangePassword from "./components/ChangePassword";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);
  const [refresh, setRefresh] = useState(0);
  const [toast, setToast] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const formRef = useRef();

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      <header className="bg-white shadow p-6 mb-10 rounded-b-xl">
        <h1 className="text-4xl font-bold text-center text-blue-700 tracking-tight">
          Local Events Tracker
        </h1>
      </header>

      <main className="max-w-3xl mx-auto px-4 space-y-6">
        {user ? (
          <>
            <div className="flex justify-between items-center bg-white p-4 rounded shadow">
              <p className="text-green-700 font-medium">
                ✅ {user?.username} is signed in
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>

            <div ref={formRef}>
              <EventForm
                user={user}
                editEvent={editEvent}
                onSubmit={() => {
                  setEditEvent(null);
                  setRefresh((r) => r + 1);
                  showToast("✅ Event saved");
                }}
              />
            </div>

            <EventList
              user={user}
              key={refresh}
              onSelect={(e) => setSelectedEvent(e)}
            />
          </>
        ) : showSignup ? (
          <Signup
            onSignupSuccess={setUser}
            onSwitchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <Login onLogin={setUser} onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </main>

      {selectedEvent && (
        <Modal
          event={selectedEvent}
          token={user?.token}
          user={user}
          onClose={() => setSelectedEvent(null)}
          onEdit={(event) => {
            setSelectedEvent(null);
            setEditEvent(event);
            setTimeout(() => {
              formRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          onDelete={async (event) => {
            const res = await fetch(`${API}/api/events/${event._id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${user.token}` },
            });

            if (res.ok) {
              showToast("🗑️ Event deleted");
              setRefresh((r) => r + 1);
            } else {
              showToast("⚠️ Failed to delete");
            }

            setSelectedEvent(null);
          }}
        />
      )}

      {showChangePassword && (
        <Modal onClose={() => setShowChangePassword(false)}>
          <ChangePassword
            token={user.token}
            onToast={showToast}
            onClose={() => setShowChangePassword(false)}
          />
        </Modal>
      )}

    </div>
  );
}
