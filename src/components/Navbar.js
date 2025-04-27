'use client'; // Add this line to indicate that this component is client-side

import { useState } from "react";
import Link from "next/link"; // Import Next.js Link for routing
import { supabase } from "../lib/supabase"; // Ensure the correct path
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

function Navbar({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // Initialize the useRouter hook

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin'); // Redirect to the sign-in page after logging out
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth', // Smooth scroll
        block: 'start', // Scroll to the top of the section
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* FreshAI Logo with Gradient */}
        <Link 
          href="/" 
          className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#6246ea] to-[#e45858] hover:text-transparent"
        >
          FreshAI
        </Link>

        {/* Navigation links for larger screens */}
        <nav className="hidden md:flex space-x-8 items-center text-[#0a2540] font-medium">
          {["features", "how-it-works", "pricing", "join-waitlist"].map((item) => (
            <Link
              key={item}
              href={`/#${item}`}
              className="cursor-pointer relative group text-lg"
            >
              {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0a2540] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {session && (
            <Link href="/dashboard" className="hover:text-[#0984e3] text-lg">
              Dashboard
            </Link>
          )}
        </nav>

        {/* User authentication and Get Started button for larger screens */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-sm text-gray-700">
                Hi, {session.user?.user_metadata?.name || session.user?.email}
              </span>
              <button onClick={handleLogout} className="text-sm text-[#e74c3c] hover:text-[#c0392b]">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-[#0a2540] hover:text-[#0984e3]">
                Sign In
              </Link>
              <button
                onClick={() => scrollToSection('join-waitlist')}
                className="bg-[#0984e3] hover:bg-[#075a96] text-white px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden text-[#0a2540] hover:text-[#0984e3]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white shadow-md">
          {["features", "how-it-works", "pricing", "join-waitlist"].map((item) => (
            <Link
              key={item}
              href={`/#${item}`}
              onClick={toggleMenu}
              className="block hover:text-[#0984e3] text-lg"
            >
              {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
          {session && (
            <Link href="/dashboard" onClick={toggleMenu} className="block hover:text-[#0984e3] text-lg">
              Dashboard
            </Link>
          )}
          {session ? (
            <>
              <span className="block text-sm text-gray-700">
                Hi, {session.user?.user_metadata?.name || session.user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="block text-sm text-[#e74c3c] hover:text-[#c0392b]"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={toggleMenu} className="block text-sm text-[#0a2540] hover:text-[#0984e3]">
                Sign In
              </Link>
              <button
                onClick={() => scrollToSection('join-waitlist')}
                onClick={toggleMenu}
                className="block text-center bg-[#0984e3] hover:bg-[#075a96] text-white py-2 rounded-xl text-sm font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
