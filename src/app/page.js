'use client';

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import SEO from "../components/SEO"; // ✅ Import your SEO component

import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import JoinWaitList from "../components/JoinWaitList";
import ContactUs from "@/components/ContactUs";
import FaqSection from "@/components/FaqSection";
import ProblemSolving from "../components/problemsolving";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <SEO 
        title="FreshAI - AI Powered Customer Support & CRM" 
        description="Automate customer support, marketing, CRM, and boost your sales with FreshAI. The future of AI-powered business automation is here." 
        url="https://freshai.io"  // ✅ Update to your real domain
        image="https://freshai.io/images/seo-banner.png" // ✅ Update if needed
      />

      {/* ✅ Your Sections */}
      <Hero />
      <Features />
      <HowItWorks />
      <ProblemSolving />
      <Pricing />
      <FaqSection />
      <JoinWaitList />
      <ContactUs />
    </>
  );
}
