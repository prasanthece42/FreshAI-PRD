"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [resetMessage, setResetMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blob1X = useTransform(mouseX, [0, windowWidth], [-20, 20]);
  const blob1Y = useTransform(mouseY, [0, windowHeight], [-20, 20]);
  const blob2X = useTransform(mouseX, [0, windowWidth], [20, -20]);
  const blob2Y = useTransform(mouseY, [0, windowHeight], [20, -20]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (signInError) {
        // Handle incorrect password (400 Bad Request)
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Incorrect password. Please try again.");
        } 
        // Handle other errors
        else {
          setError(signInError.message);
        }
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setResetMessage("");
    setError("");
  };

  const handleResetPassword = async () => {
    setResetMessage("");
    setError("");

    if (!email || email.trim() === "") {
      setResetMessage("Please enter a valid email address.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setResetMessage(`Error: ${error.message}`);
    } else {
      setResetMessage("Check your email for the password reset link.");
      setShowPopup(true);
    }
  };

  return (
    <section
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {!isMobile && (
        <>
          <motion.div
            style={{ x: blob1X, y: blob1Y }}
            className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
          />
          <motion.div
            style={{ x: blob2X, y: blob2Y }}
            className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
          />
        </>
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Side */}
        <div className="hidden md:block w-1/2 pr-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-[#6246ea] to-[#e45858] text-transparent bg-clip-text">
              Welcome to FreshAI
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your AI assistant for customer support, sales, and marketing — powered by intelligence that adapts to you.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            {isForgotPassword ? "Reset Password" : "Sign In"}
          </h2>

          {/* Error Message */}
          {(error || resetMessage) && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}>
              {error || resetMessage}
            </div>
          )}

          {!isForgotPassword ? (
            <>
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-50 transition disabled:opacity-70"
                >
                  <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full mt-4 text-indigo-600 hover:text-indigo-500 text-sm"
                >
                  Back to Sign In
                </button>
              </div>
            </>
          )}

          {!isForgotPassword && (
            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign up
              </button>
            </p>
          )}

          {/* Popup message */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h3 className="text-lg font-medium text-gray-800">Password Reset Email Sent</h3>
                <p className="mt-4 text-sm text-gray-600">
                  We've sent a password reset link to your email address. Please check your inbox.
                </p>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setIsForgotPassword(false);
                  }}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}