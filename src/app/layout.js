'use client';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA"; // ✅ Add this
import './globals.css';

export default function Layout({ children }) {
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
    <html lang="en">
      <body>
        <Navbar session={session} />
        <main>{children}</main>
        <Footer />
        <FloatingCTA /> {/* ✅ CTA now appears on all pages */}
      </body>
    </html>
  );
}
