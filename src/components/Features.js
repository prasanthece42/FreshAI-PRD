'use client'; // This ensures that the component runs on the client side

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Zap,
  BarChart3,
  Database,
  Target,
  TrendingUp,
  DollarSign,
  Mail,
} from "lucide-react";

const features = [
  {
    icon: <MessageSquare />,
    title: "AI Social Media Assistant",
    desc: "Respond instantly to messages on social media platforms using smart, context-aware AI agents.",
    detail:
      "Automatically engage with your customers 24/7 across platforms like Instagram, Facebook, and WhatsApp. Improve response times, reduce manual effort, and boost customer satisfaction with trained AI.",
  },
  {
    icon: <Send />,
    title: "Smart Payment Links",
    desc: "Easily share dynamic payment links directly from conversations.",
    detail:
      "Generate and send one-click payment links personalized for your clients. Integrate with Stripe or Razorpay and track payments seamlessly from the dashboard.",
  },
  {
    icon: <Users />,
    title: "Contact Management",
    desc: "Maintain a unified customer view with a simple, intuitive CRM.",
    detail:
      "Track customer interactions, view conversation history, and organize leads or prospects in a clean dashboard designed for growth-focused teams.",
  },
  {
    icon: <Zap />,
    title: "Promotional Campaigns",
    desc: "Automate offers, product launches, and promotions with AI.",
    detail:
      "Schedule and launch promotional messages tailored to user behavior. Drive conversions using automated responses and targeted outreach.",
  },
  {
    icon: <BarChart3 />,
    title: "Sales Analytics",
    desc: "Real-time insights to measure campaign effectiveness and growth.",
    detail:
      "Track every metric that matters — conversations, engagement, conversion rates — with visual reports powered by intelligent data modeling.",
  },
  {
    icon: <Database />,
    title: "Train Your AI",
    desc: "Upload your data or PDFs to personalize the AI's knowledge.",
    detail:
      "Empower the AI with your product manuals, pricing documents, or FAQs to ensure accurate responses that align with your brand and business logic.",
  },
  {
    icon: <Target />,
    title: "Automated Ad Targeting",
    desc: "AI finds your perfect audience and delivers your ads there.",
    detail:
      "Automatically build and optimize ad audiences based on customer behavior, demographic trends, and past campaign results.",
  },
  {
    icon: <TrendingUp />,
    title: "AI Insights",
    desc: "Receive actionable suggestions based on user behavior and data.",
    detail:
      "Get proactive insights into what’s working, what’s not, and how to improve — powered entirely by your usage patterns and customer interactions.",
  },
  {
    icon: <DollarSign />,
    title: "Lightweight CRM",
    desc: "Track conversations, manage sales, and simplify your pipeline.",
    detail:
      "Designed for speed and ease of use, our CRM lets you manage relationships, assign tasks, and follow up — all without the complexity.",
  },
  {
    icon: <Mail />,
    title: "Email Marketing Automation",
    desc: "Create, schedule, and personalize email campaigns effortlessly.",
    detail:
      "Send welcome messages, newsletters, and win-back sequences with AI-personalized content and timing — all in one dashboard.",
  },
];

function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="features"
      className="relative py-24 px-6 overflow-hidden bg-[#f8f9fc]"
      style={{
        backgroundImage: `
        linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
      `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Power Your Growth with AI
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Automate everything from social media to analytics and marketing with FreshAI’s all-in-one solution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative">
        {features.map((feature, index) => {
          const isSelected = selected === index;

          return (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-md border p-8 rounded-3xl shadow-xl cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-blue-500 shadow-2xl scale-105"
                  : "border-white/30 hover:scale-105"
              }`}
              style={{
                animation: !isMobile
                  ? `float-${index % 2 === 0 ? "up" : "down"} 6s ease-in-out infinite`
                  : "none",
              }}
              onClick={() => setSelected(isSelected ? null : index)}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-[#6246ea]/10 rounded-xl text-[#6246ea]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>

              {isSelected && (
                <div className="mt-4 text-sm text-gray-700">
                  <p>{feature.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating keyframes */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-down {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}

export default Features;
