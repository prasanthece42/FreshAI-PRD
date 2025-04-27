'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, BrainCircuit, Send, BarChart3 } from 'lucide-react'

const steps = [
  {
    title: 'Connect Your Channels',
    short: 'Link your social accounts & CRM in seconds.',
    detail:
      'Effortlessly integrate Instagram, WhatsApp, email, and more. Connect your CRM to manage leads and conversations all in one place.',
    icon: CheckCircle,
  },
  {
    title: 'Train Your AI',
    short: 'Teach it using your website, PDFs, or FAQs.',
    detail:
      'Upload docs or share your site link. Your AI learns from your tone, FAQs, and brand style — adapting responses just like your team would.',
    icon: BrainCircuit,
  },
  {
    title: 'Automate Engagement',
    short: 'Let AI handle queries, send links & book appointments.',
    detail:
      'Your assistant replies instantly to inquiries, shares payment links, captures lead info, and even helps customers book services in real time.',
    icon: Send,
  },
  {
    title: 'Track & Optimize',
    short: 'Get insights, analytics & campaign feedback.',
    detail:
      'Monitor user queries, lead funnels, and AI performance. Use these insights to fine-tune responses, run A/B tests, and improve conversions.',
    icon: BarChart3,
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="how-it-works"
      className="relative w-full px-6 py-20 overflow-x-hidden snap-y snap-mandatory"
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
          How It Works
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Set up your AI assistant in a few simple steps. No code, no complexity.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto relative border-l-2 border-dashed border-gray-300 pl-6 space-y-8 snap-y snap-mandatory">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              layout
              onClick={() => setActiveStep(index === activeStep ? null : index)}
              className={`relative transition-all duration-300 cursor-pointer backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg px-6 py-5 flex items-start gap-4 snap-start ${
                activeStep === index ? 'ring-2 ring-[#6246ea]' : ''
              }`}
              animate={
                !isMobile
                  ? {
                      y: [0, -1, 1, -1, 0],
                      transition: {
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
                  : {}
              }
            >
              <div className="absolute -left-10 top-5 w-8 h-8 rounded-full bg-[#6246ea] text-white font-bold flex items-center justify-center shadow">
                {index + 1}
              </div>

              <div className="pt-1">
                <Icon className="text-[#6246ea] w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.short}</p>
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-gray-700 overflow-hidden"
                    >
                      {step.detail}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      <style jsx>{`
        .snap-y {
          scroll-snap-type: y mandatory;
          scroll-padding-top: 100px;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        .snap-mandatory {
          scroll-snap-type: y mandatory;
        }
        .relative:hover .border-l-2 {
          animation: glowEffect 1s infinite ease-in-out;
        }
        @keyframes glowEffect {
          0% {
            border-color: rgba(98, 70, 234, 0.6);
          }
          50% {
            border-color: rgba(98, 70, 234, 1);
          }
          100% {
            border-color: rgba(98, 70, 234, 0.6);
          }
        }
      `}</style>
    </section>
  )
}
