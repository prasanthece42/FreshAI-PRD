// components/FloatingCTA.js
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // show after 300px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[400px] bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 flex items-center justify-between z-50 border border-gray-200"
        >
          <div className="text-gray-800 text-sm font-medium">
            🚀 Don’t miss early access!
          </div>
          <Link
            href="/#join-waitlist"
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Join Waitlist
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingCTA;
