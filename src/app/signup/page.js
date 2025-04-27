"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      // Attempt signup directly
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName // Store name in user_metadata
          }
        }
      });

      if (signUpError) {
        // Handle specific error cases
        if (signUpError.message.includes("User already registered")) {
          setError("An account with this email already exists. Redirecting to sign in...");
          setTimeout(() => router.push("/signin"), 2000);
          return;
        }
        throw signUpError;
      }

      // Check if email confirmation is required
      if (data.user?.identities?.length === 0) {
        setError("An account with this email already exists. Redirecting to sign in...");
        setTimeout(() => router.push("/signin"), 2000);
        return;
      }

      // Success case
      setSuccessMessage(`
        Thank you for registering! 
        Please check your email (${email}) to confirm your account.
        After confirmation, you can sign in with your credentials.
      `);

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (successMessage) {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gray-50">
        <div className="relative z-10 max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Registration Successful!
            </h3>
            <p className="text-green-600 mb-4 whitespace-pre-line">{successMessage}</p>
            <div className="mt-6">
              <button
                onClick={() => router.push("/signin")}
                className="px-6 py-2 bg-[#6246ea] text-white rounded-lg hover:bg-[#4e3ac9] transition"
              >
                Go to Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Regular form state
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gray-50">
      {/* Background blobs */}
      <motion.div
        initial={{ x: -100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
      />
      <motion.div
        initial={{ x: 100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
      />

      {/* Form box */}
      <div className="relative z-10 max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            error.includes("already exists") 
              ? "bg-blue-50 text-blue-700" 
              : "bg-red-50 text-red-700"
          }`}>
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6246ea] focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6246ea] focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6246ea] focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6246ea] focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-6 py-3 bg-[#6246ea] text-white font-medium rounded-lg hover:bg-[#4e3ac9] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/signin")}
            className="text-[#6246ea] hover:text-[#4e3ac9] font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}