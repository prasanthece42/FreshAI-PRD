'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Users,
  Image,
  Contact,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: <Bot size={22} />,
    title: 'AI Social Media Assistant',
    desc: 'Train your AI to respond like a human on social media platforms, engaging with users in a natural and conversational manner.',
  },
  {
    icon: <Users size={22} />,
    title: 'Lead Generation',
    desc: 'Automate the process of capturing leads through forms, chatbots, and integrations, helping you build and nurture a steady stream of potential customers.',
  },
  {
    icon: <Image size={22} />,
    title: 'Poster Creation for Social Media',
    desc: 'Create visually appealing social media posters quickly and easily with AI-generated templates, ideal for promotional campaigns.',
  },
  {
    icon: <Contact size={22} />,
    title: 'Lightweight CRM for Contact Management',
    desc: 'Manage your contacts, track communications, and stay organized with a simple and intuitive CRM system integrated into the platform.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Sales Analytics',
    desc: 'Gain actionable insights into your sales performance, track conversions, and identify trends that can optimize your sales strategies.',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-screen-xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Everything you need to scale with AI
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          From automating your DMs to analyzing sales, FreshAI makes growing your business seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 max-w-screen-xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="w-full flex flex-col sm:flex-row items-start gap-4 sm:gap-5 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
              {feature.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
