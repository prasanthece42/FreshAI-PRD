import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO"; // Importing SEO component

function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.includes("@") || !formData.name || !formData.message) {
      setError("Please fill out all fields with valid information.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([{ ...formData, submitted_at: new Date() }]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us - FreshAI"
        description="Get in touch with FreshAI for support, questions, or feedback. We're here to help you with AI-powered customer support solutions."
        url="https://freshai.io/contact"  // Update with real URL
        image="https://freshai.io/og-image.png" // Update with real image URL
      />

      <section
        className="relative py-16 bg-[#f8f9fc] px-6"
        style={{
          backgroundColor: "#f8f9fc",
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "40px 40px",
        }}
        id="contact"
      >
        {/* Floating blobs */}
        <motion.div
          initial={{ x: -120, y: -80 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-[350px] h-[350px] bg-gradient-to-br from-[#6246ea] to-[#3fc1c9] rounded-full opacity-30 blur-3xl top-[-100px] left-[-120px] z-0"
        />
        <motion.div
          initial={{ x: 80, y: 120 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-[250px] h-[250px] bg-gradient-to-tr from-[#e45858] to-[#6246ea] rounded-full opacity-30 blur-3xl bottom-[-100px] right-[-80px] z-0"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-green-600"
              >
                Thank you for reaching out! We'll get back to you soon.
              </motion.div>
            ) : (
              <>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-6 py-3 text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-6 py-3 text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
                    required
                  />
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="px-6 py-3 text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
