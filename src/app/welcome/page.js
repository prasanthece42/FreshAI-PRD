"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.prefetch("/signin");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
      }}
    >
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

      {/* Content box */}
      <div className="relative z-10 max-w-lg w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to FreshAI! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to your inbox. <br />
          Please verify your email to continue!
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="mt-4 px-6 py-3 bg-[#6246ea] hover:bg-[#4e3ac9] text-white rounded-xl text-lg font-medium shadow-md transition"
        >
          Go to Sign In
        </button>
      </div>
    </section>
  );
}
