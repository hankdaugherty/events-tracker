// Same imports...

export default function Signup({ onSignupSuccess, onSwitchToLogin }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (form.password !== confirmPassword)
        return setError("Passwords do not match");
  
      try {
        const res = await fetch(`${API}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Signup failed");
  
        const user = { token: data.token, username: form.username };
        localStorage.setItem("user", JSON.stringify(user));
        onSignupSuccess(user);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 space-y-4 max-w-sm mx-auto mt-10"
      >
        <h2 className="text-lg font-semibold text-gray-800">Create Account</h2>
        <input
          className="border w-full p-2 rounded"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="border w-full p-2 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="border w-full p-2 rounded"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">❌ {error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    );
  }
  