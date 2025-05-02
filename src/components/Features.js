'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Users,
  Image,
  Contact,
  BarChart3,
  TrendingUp,
  MessageCircle,
  Tool,
  Package,
} from 'lucide-react';

const features = [
  {
    icon: <Bot size={22} />,
    title: 'AI Social Media Assistant',
    desc: 'Engage on platforms like a pro. Respond like a human across social platforms, auto-post to Reddit & Facebook Groups, generate content, and schedule posts.',
  },
  {
    icon: <Users size={22} />,
    title: 'Automated Lead Generation & Outreach',
    desc: 'Reach the right people at the right time. AI-powered cold outreach via Gmail, LinkedIn, WhatsApp, or Instagram, with personalized messages and automated follow-ups.',
  },
  {
    icon: <Image size={22} />,
    title: 'AI-Powered Content & Poster Creation',
    desc: 'Create scroll-stopping visuals and listings in seconds. Generate optimized posters for social media and ads, with custom AI ad copy and low-budget ad creation tools.',
  },
  {
    icon: <Contact size={22} />,
    title: 'Lightweight CRM & Smart Dashboard',
    desc: 'Track every lead and interaction in one place. Manage contacts, communications, and campaigns with a central dashboard that integrates with Google My Business and reviews.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Sales Analytics & Growth Insights',
    desc: 'Know what’s working. Track conversions, outreach success, and traffic. Use AI insights to optimize campaigns and set up referral tracking.',
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
