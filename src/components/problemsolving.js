import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LucideMessageCircle, LucideBot, LucideCreditCard, LucidePieChart } from "lucide-react";

// Problem-solving data (icons + descriptions)
const problems = [
  {
    icon: <LucideMessageCircle className="text-purple-500 w-8 h-8" />,
    title: "Too Many Customer Queries",
    description: "FreshAI automatically handles customer queries, reducing response times and increasing customer satisfaction."
  },
  {
    icon: <LucideBot className="text-green-500 w-8 h-8" />,
    title: "No Time for Marketing",
    description: "With FreshAI, marketing campaigns are automated, ensuring you reach your customers at the right time."
  },
  {
    icon: <LucideCreditCard className="text-yellow-500 w-8 h-8" />,
    title: "Lost Sales from Delayed Replies",
    description: "FreshAI ensures real-time responses to potential customers, boosting conversion rates and preventing lost sales."
  },
  {
    icon: <LucidePieChart className="text-red-500 w-8 h-8" />,
    title: "No Insights or Tracking",
    description: "FreshAI provides deep analytics and insights into customer interactions, allowing you to make data-driven decisions."
  },
];

const ProblemSolving = () => {
  const [revealedIndex, setRevealedIndex] = useState(0);

  // Reveal icons one by one at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setRevealedIndex((prevIndex) => (prevIndex + 1) % problems.length); // Loop through the problems array
    }, 3000); // Change this interval to control the speed of reveal

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section id="problem-solving" className="py-24 relative">
      {/* White Checked Background */}
      <div
        className="absolute inset-0 bg-white checked-pattern" // Add checked pattern here
        style={{
          opacity: 1,
          zIndex: -1,
        }}
      ></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 px-6">
        {/* Left Side - Title */}
        <div className="md:w-1/2 text-left flex flex-col justify-center items-start">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">How FreshAI Solves Your Business Challenges</h2>
          <p className="text-lg text-gray-600">
            FreshAI helps businesses tackle their toughest problems with AI-powered solutions. See how we can help.
          </p>
        </div>

        {/* Right Side - L & Reverse L Shape with Revealing Icons */}
        <div className="md:w-1/2 relative flex justify-center items-center h-[400px]">
          {/* L shape */}
          <motion.div
            className="absolute flex flex-col gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealedIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ left: "20%", top: "30%" }}
          >
            {revealedIndex === 0 && (
              <motion.div
                className="relative p-6 bg-white rounded-lg shadow-xl w-56 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 99, 132, 0.7)", // Glowing effect
                }}
                style={{ boxShadow: revealedIndex === 0 ? "0 0 10px rgba(255, 99, 132, 0.5)" : "none" }}
              >
                {problems[0].icon}
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{problems[0].title}</h3>
                <div className="text-gray-700 text-sm mt-2">
                  {problems[0].description}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="absolute flex flex-col gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealedIndex === 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ left: "20%", top: "60%" }}
          >
            {revealedIndex === 1 && (
              <motion.div
                className="relative p-6 bg-white rounded-lg shadow-xl w-56 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(99, 255, 132, 0.7)", // Glowing effect
                }}
                style={{ boxShadow: revealedIndex === 1 ? "0 0 10px rgba(99, 255, 132, 0.5)" : "none" }}
              >
                {problems[1].icon}
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{problems[1].title}</h3>
                <div className="text-gray-700 text-sm mt-2">
                  {problems[1].description}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Reverse L shape */}
          <motion.div
            className="absolute flex flex-col gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealedIndex === 2 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ right: "20%", top: "30%" }}
          >
            {revealedIndex === 2 && (
              <motion.div
                className="relative p-6 bg-white rounded-lg shadow-xl w-56 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 159, 64, 0.7)", // Glowing effect
                }}
                style={{ boxShadow: revealedIndex === 2 ? "0 0 10px rgba(255, 159, 64, 0.5)" : "none" }}
              >
                {problems[2].icon}
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{problems[2].title}</h3>
                <div className="text-gray-700 text-sm mt-2">
                  {problems[2].description}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="absolute flex flex-col gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealedIndex === 3 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ right: "20%", top: "60%" }}
          >
            {revealedIndex === 3 && (
              <motion.div
                className="relative p-6 bg-white rounded-lg shadow-xl w-56 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 99, 132, 0.7)", // Glowing effect
                }}
                style={{ boxShadow: revealedIndex === 3 ? "0 0 10px rgba(255, 99, 132, 0.5)" : "none" }}
              >
                {problems[3].icon}
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{problems[3].title}</h3>
                <div className="text-gray-700 text-sm mt-2">
                  {problems[3].description}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolving;
