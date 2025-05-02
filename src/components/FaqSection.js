// components/FaqSection.js

'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is FreshAI?',
    answer:
      'FreshAI is an AI-powered assistant that automates customer support, handles queries, integrates with your CRM, and helps manage appointments and conversations across platforms like Instagram, WhatsApp, and email.',
  },
  {
    question: 'How do I connect my social media channels?',
    answer:
      'You can link platforms like Instagram, WhatsApp, and Gmail within seconds through your dashboard. We provide easy plug-and-play integrations.',
  },
  {
    question: 'Can I train the AI with my own content?',
    answer:
      'Yes! Upload your website, PDFs, or FAQs, and the AI will learn your tone, brand language, and key information to respond just like your team.',
  },
  {
    question: 'Is coding required to set up FreshAI?',
    answer:
      'Nope. Everything is no-code. Just plug in your channels, upload your content, and you’re good to go.',
  },
  {
    question: 'Can it book appointments or reservations?',
    answer:
      'Yes, FreshAI can help customers schedule appointments or make reservations through real-time conversation.',
  },
  {
    question: 'How does FreshAI generate leads?',
    answer:
      'FreshAI uses AI-powered cold outreach and form capture to find and qualify prospects. It scans business directories, Google Maps, and your specified audiences to build targeted lists, then sends personalized messages via email, LinkedIn, WhatsApp, or Instagram.',
  },
  {
    question: 'Which platforms can I automate marketing on?',
    answer:
      'You can automate outreach and posting across Facebook, Instagram, LinkedIn, Reddit, WhatsApp, Gmail, and more. FreshAI unifies them in one dashboard so you never miss an opportunity.',
  },
  {
    question: 'How does FreshAI optimize my ad campaigns?',
    answer:
      'FreshAI analyzes performance data—click-throughs, conversions, engagement rates—and suggests budget allocations, audience tweaks, and copy variations. Its low-budget ad tool helps you test ideas quickly and scale winning campaigns.',
  },
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="w-full py-20 px-6"
      style={{
        backgroundColor: '#f8f9fc',
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Everything you need to know about FreshAI.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            onClick={() => toggleIndex(index)}
            className={`cursor-pointer backdrop-blur-md bg-white/70 border rounded-2xl shadow-sm hover:shadow-lg transition-all px-6 py-5 ${
              activeIndex === index
                ? 'border-[#6246ea] ring-2 ring-[#6246ea]'
                : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-600 text-sm overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
