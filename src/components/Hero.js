"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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

  return (
    <section
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 overflow-hidden"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Floating blobs */}
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

      {/* Content Section */}
      <div className="relative z-10 flex w-full max-w-6xl mx-auto flex-col md:flex-row items-center md:items-start">
        {/* Left side: Main Heading */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#6246ea] to-[#e45858] text-transparent bg-clip-text">
              AI Growth Engine
            </span>
          </motion.h1>
        </div>

        {/* Right side: Tagline, Description, CTA */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8 flex flex-col items-start">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight"
          >
            That Drives Traffic to Your Business—Even If You're Just Getting Started
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-900 max-w-3xl"
          >
            FreshAI helps you attract leads, post across social platforms, run low-budget ads, and automate outreach—no followers needed. Focus on your product, and let our AI handle the growth.
          </motion.p>

          <motion.a
            href="#join-waitlist"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-6 sm:mt-8 bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-3 rounded-xl text-base sm:text-lg font-medium shadow-md"
          >
            Join the Waitlist
          </motion.a>
        </div>
      </div>
    </section>
  );
}
