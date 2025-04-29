'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const plans = [
  {
    title: 'Free',
    price: '$0/month',
    features: ['1 AI assistant', '1000 messages/month', 'Basic analytics'],
  },
  {
    title: 'Starter',
    price: '$29/month',
    features: ['3 AI assistants', '8,000 messages/month', 'CRM integration', 'Email support'],
  },
  {
    title: 'Pro',
    price: '$79/month',
    features: ['10 AI assistants', '15,000 messages/month', 'All integrations', 'Priority support'],
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleClick = (plan) => {
    setSelectedPlan(plan);

    // Track plan selection event (Google Analytics)
    if (window.gtag) {
      window.gtag('event', 'select_plan', {
        plan_name: plan.title,
        plan_price: plan.price,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Pricing - FreshAI</title>
        <meta
          name="description"
          content="Choose the right plan for your business and get started with FreshAI. Affordable AI-powered customer support, marketing, and CRM solutions."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freshai.io/pricing" />
      </Head>

      <section
        id="pricing"
        className="relative py-20 bg-[#f8f9fc] px-6"
        style={{
          backgroundColor: '#f8f9fc',
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Floating blobs */}
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
          className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
        />
        <motion.div
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
          className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Early Access Pricing
          </h2>
          <p className="text-[#e45858] text-lg font-medium mb-2">
            🚀 Get started now – prices will increase soon!
          </p>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Join during our early access and lock in these exclusive low rates before public launch.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`lg:block hidden bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform ${
                  selectedPlan === plan ? 'scale-105 shadow-2xl' : 'scale-100'
                } border-2 border-transparent hover:border-[#6246ea] hover:shadow-xl hover:ring-4 hover:ring-[#6246ea] hover:ring-opacity-50`}
                onClick={() => handleClick(plan)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{plan.title}</h3>
                  {plan.title !== 'Free' && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Early Access
                    </span>
                  )}
                </div>
                <p className="mt-4 text-4xl font-bold text-[#6246ea]">{plan.price}</p>
                <ul className="mt-6 text-gray-600 space-y-2 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.title !== 'Free' && (
                  <p className="text-sm text-red-500 mt-4">
                    Limited time pricing – will increase soon!
                  </p>
                )}
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-block bg-[#6246ea] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition hover:bg-[#4e3ac9]"
                  >
                    {plan.title === 'Free' ? 'Start for Free' : 'Choose Plan'}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* For smaller screens */}
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`lg:hidden block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform ${
                  selectedPlan === plan ? 'scale-105 shadow-2xl' : 'scale-100'
                } border-2 border-transparent hover:border-[#6246ea] hover:shadow-xl hover:ring-4 hover:ring-[#6246ea] hover:ring-opacity-50`}
                onClick={() => handleClick(plan)}
                style={{ transform: 'translateY(-10px)' }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{plan.title}</h3>
                  {plan.title !== 'Free' && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Early Access
                    </span>
                  )}
                </div>
                <p className="mt-4 text-4xl font-bold text-[#6246ea]">{plan.price}</p>
                <ul className="mt-6 text-gray-600 space-y-2 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.title !== 'Free' && (
                  <p className="text-sm text-red-500 mt-4">
                    Limited time pricing – will increase soon!
                  </p>
                )}
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-block bg-[#6246ea] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition hover:bg-[#4e3ac9]"
                  >
                    {plan.title === 'Free' ? 'Start for Free' : 'Choose Plan'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
