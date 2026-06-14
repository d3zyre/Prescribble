import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.svg";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill all fields");
      return;
    }
    const success = onSignup(name, email, password);
    if (!success) {
      setError("Account with this email already exists");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg, #0B1F33 0%, #1A73E8 50%, #BDFFE6 100%)" }}
    >
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-popup p-8 sm:p-10 w-full max-w-[420px]">
        <div className="text-center mb-8">
          <img src={Logo} alt="Prescribble Logo" className="h-9 mx-auto mb-5" />
          <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1.5">Get started with Prescribble</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm mb-5 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
              placeholder="Dr. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fresh-green text-white py-3 rounded-xl text-sm font-semibold hover:bg-fresh-green-dark active:scale-[0.98] transition-all mt-2 shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
