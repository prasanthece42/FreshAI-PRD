// components/Footer.js
"use client";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          
          {/* Left Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">FreshAI</h3>
            <p className="text-sm mb-4">
              AI-powered customer support, marketing automation, and analytics — all in one platform.
            </p>
          </div>

          {/* Middle Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="/#join-waitlist" className="text-gray-400 hover:text-white">Join Waitlist</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-4">Have questions? Reach out to our support team.</p>
            <p className="text-sm">
              Email: <a href="mailto:support@freshai.io" className="text-blue-400 hover:text-blue-600">support@freshai.io</a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FreshAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
