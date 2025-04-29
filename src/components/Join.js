'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Join() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Additional form state
  const [formData, setFormData] = useState({
    usage_reason: '',
    team_size: '',
    budget: '',
    pain_points: '',
    expectations: ''
  })

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)

      if (error) throw error

      if (data && data.length > 0) {
        setMessage('You are already on the waitlist!')
        setIsSubmitting(false)
        return
      }

      setStep(2)

      // Scroll to the waitlist section
      window.location.hash = '#join-waitlist'
    } catch (error) {
      console.error('Error:', error)
      setMessage('Something went wrong. Please try again later.')
    }

    setIsSubmitting(false)
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ 
          email, 
          submitted_at: new Date().toISOString(),
          ...formData 
        }])

      if (insertError) throw insertError

      // Send email notification
      const emailResponse = await fetch('/api/send-waitlist-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const emailData = await emailResponse.json()

      if (emailData.error) {
        console.error('Email Error:', emailData.error)
        setMessage('Signed up but email failed to send.')
      } else {
        setMessage('Thank you for joining! We will be in touch.')
        setStep(1)
        setEmail('')
        setFormData({
          usage_reason: '',
          team_size: '',
          budget: '',
          pain_points: '',
          expectations: ''
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      setMessage('Something went wrong. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <section id="join-waitlist" className="relative w-full px-6 py-20 bg-[#f8f9fc]">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
          Join the Waitlist
        </h2>
        <p className="text-lg text-gray-600">
          Be the first to experience the future of customer engagement.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto relative space-y-8">
        <motion.div
          layout
          className="relative backdrop-blur-lg bg-white/60 border border-gray-200 rounded-xl shadow-lg px-8 py-12 flex flex-col items-center gap-6"
        >
          <div className="pt-2">
            <UserPlus className="text-[#6246ea] w-8 h-8" />
          </div>

          {step === 1 ? (
            <div className="text-center w-full">
              <h3 className="text-xl font-semibold text-gray-800">
                Sign up for the waitlist
              </h3>
              <p className="text-sm text-gray-500">
                Get early access to FreshAI
              </p>

              <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-6 py-3 w-full sm:w-[320px] rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#6246ea] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 mt-4 sm:mt-0 w-full sm:w-auto bg-[#6246ea] text-white font-semibold rounded-lg hover:bg-[#6246ea]/90 transition-all duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Join Now'}
                </button>
              </form>
              {message && (
                <p className="text-sm mt-4 text-green-600 font-medium">
                  {message}
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleFinalSubmit} className="w-full space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                Tell us more
              </h3>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Why did you subscribe?"
                  value={formData.usage_reason}
                  onChange={(e) => setFormData({ ...formData, usage_reason: e.target.value })}
                  required
                  className="px-4 py-3 w-full rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Team size?"
                  value={formData.team_size}
                  onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                  required
                  className="px-4 py-3 w-full rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="How much would you like to spend?"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                  className="px-4 py-3 w-full rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Your biggest pain point?"
                  value={formData.pain_points}
                  onChange={(e) => setFormData({ ...formData, pain_points: e.target.value })}
                  required
                  className="px-4 py-3 w-full rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="What do you expect from FreshAI?"
                  value={formData.expectations}
                  onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                  required
                  className="px-4 py-3 w-full rounded-lg border border-gray-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6246ea] text-white font-semibold py-3 rounded-lg hover:bg-[#6246ea]/90 transition-all duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Finish Signup'}
                </button>
                {message && (
                  <p className="text-sm mt-2 text-green-600 text-center">
                    {message}
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
