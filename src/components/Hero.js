"use client"; // Mark this file as client-side only

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0); // Track window width
  const [windowHeight, setWindowHeight] = useState(0); // Track window height

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    if (typeof window !== "undefined") {
      handleResize(); // Initial size on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Motion values for blob parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use the window dimensions only if the component has mounted
  const blob1X = useTransform(mouseX, [0, windowWidth], [-20, 20]);
  const blob1Y = useTransform(mouseY, [0, windowHeight], [-20, 20]);
  const blob2X = useTransform(mouseX, [0, windowWidth], [20, -20]);
  const blob2Y = useTransform(mouseY, [0, windowHeight], [20, -20]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      onMouseMove={!isMobile ? handleMouseMove : undefined}
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
      {/* Floating blobs - desktop only with parallax */}
      {!isMobile && (
        <>
          <motion.div
            style={{ x: blob1X, y: blob1Y, willChange: "transform" }}
            className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
          />
          <motion.div
            style={{ x: blob2X, y: blob2Y, willChange: "transform" }}
            className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
        >
          <span className="bg-gradient-to-r from-[#6246ea] to-[#e45858] text-transparent bg-clip-text">
            AI-Powered Automation
          </span>{" "}
          for Your Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-600"
        >
          Respond to users on social platforms, send payment links, manage contacts, launch promotions, and get sales insights — with AI that learns from you.
        </motion.p>

        <motion.a
          href="#join-waitlist"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block mt-8 bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md"
        >
          Join the Waitlist
        </motion.a>
      </div>
    </section>
  );
}
