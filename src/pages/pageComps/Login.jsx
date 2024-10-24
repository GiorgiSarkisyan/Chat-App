/* eslint-disable react/prop-types */
import { useState } from "react";
import { signIn } from "../../supabase/actions";
import { useNavigate } from "react-router-dom";

export default function Login({ setState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { user, error, session } = await signIn(email, password);
      console.log("Login response:", { user, error, session });
      if (error) {
        setError(error.message);
      } else if (user) {
        console.log("User logged in:", user);
        setState(false);
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-dvh w-full bg-[#343541] flex items-center justify-center">
      <div className="transition-all duration-300  w-96 h-auto bg-slate-800 rounded-lg shadow-lg p-6">
        <form
          className="w-full flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex w-full flex-col">
            <label className="text-white mb-1 font-inter">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="text-white mb-1 font-inter">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-slate-700 w-40 h-10 text-white font-inter"
              disabled={loading}
              onClick={() => setState(true)}
            >
              Sign Up
            </button>
            <button
              type="submit"
              className="bg-slate-700 w-40 h-10 text-white font-inter"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
