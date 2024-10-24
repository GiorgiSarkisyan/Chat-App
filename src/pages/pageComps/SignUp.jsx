/* eslint-disable react/prop-types */
import { useState } from "react";
import { signUp } from "../../supabase/actions";
import supabase from "../../supabase/supabase";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setState }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: existingUsers, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .or(`username.eq.${username},email.eq.${email}`);

      if (fetchError) {
        setError("An error occurred while checking for existing users.");
        setLoading(false);
        return;
      }

      if (existingUsers.length > 0) {
        const existingUsernames = existingUsers.map((user) => user.username);
        const existingEmails = existingUsers.map((user) => user.email);

        if (existingUsernames.includes(username)) {
          setError("Username already taken.");
          setLoading(false);
          return;
        }

        if (existingEmails.includes(email)) {
          setError("Email already registered.");
          setLoading(false);
          return;
        }
      }

      const { data, error } = await signUp(username, email, password, file);
      if (error) {
        setError(error.message);
      } else {
        console.log("User signed up:", data);
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred during sign-up");
    }

    setLoading(false);
  };

  return (
    <div className="relative responsive transition-all duration-300 w-96 h-auto bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="absolute transition-all duration-300 right-2 top-2 rounded-full bg-slate-700 text-white  hover:bg-white hover:text-zinc-900">
        <BiLeftArrowAlt
          className="w-7 h-7 cursor-pointer"
          onClick={() => setState(false)}
        />
      </div>
      <form
        className="w-full flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex w-full flex-col">
          <label className="text-white mb-1 font-inter">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email */}
        <div className="flex w-full flex-col">
          <label className="text-white mb-1 font-inter">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Password */}
        <div className="flex w-full flex-col">
          <label className="text-white mb-1 font-inter">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* File Upload */}
        <div className="flex w-full flex-col">
          <label className="text-white mb-1 font-inter">Select image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-slate-700 w-40 h-10 text-white font-inter"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
