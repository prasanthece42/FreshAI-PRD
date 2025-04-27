'use client';

import { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    const blobElements = document.querySelectorAll('.blob');

    // Randomly animate blob movement
    blobElements.forEach((blob) => {
      const randomX = Math.floor(Math.random() * 100) + 30; // random x movement
      const randomY = Math.floor(Math.random() * 100) + 30; // random y movement
      const randomDuration = Math.floor(Math.random() * 20) + 5; // random movement duration
      const randomDelay = Math.floor(Math.random() * 10); // random delay

      blob.style.animation = `float ${randomDuration}s infinite ease-in-out ${randomDelay}s`;

      blob.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center relative overflow-hidden">
      {/* Floating blobs in the background */}
      <div className="absolute inset-0 z-0">
        <div className="blob bg-blue-200 w-32 h-32 rounded-full absolute top-1/4 left-1/3 opacity-50"></div>
        <div className="blob bg-purple-300 w-48 h-48 rounded-full absolute top-1/2 right-1/4 opacity-50"></div>
        <div className="blob bg-pink-300 w-36 h-36 rounded-full absolute bottom-1/3 left-1/4 opacity-50"></div>
        <div className="blob bg-green-200 w-40 h-40 rounded-full absolute top-1/6 right-1/6 opacity-50"></div>
      </div>

      {/* Content with glassmorphism */}
      <div className="backdrop-blur-lg bg-white/50 border border-white/30 rounded-2xl shadow-2xl p-8 max-w-4xl w-full text-gray-800 relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
        <p className="text-sm mb-8 text-center text-gray-600">Last updated: April 26, 2025</p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to <strong>FreshAI</strong>! These Terms of Service ("Terms") govern your use of our website and services.
            By using FreshAI, you agree to these Terms. If you don’t agree, please don’t use our services.
          </p>

          <h2 className="text-xl font-semibold">1. Use of the Service</h2>
          <p>
            You must be at least 13 years old to use FreshAI. You agree to use the platform lawfully and responsibly.
          </p>

          <h2 className="text-xl font-semibold">2. Account Registration</h2>
          <p>
            You are responsible for your login credentials. All information provided must be accurate and current.
          </p>

          <h2 className="text-xl font-semibold">3. Email Verification</h2>
          <p>
            We may require email verification before allowing full access. Unverified users may experience limited features.
          </p>

          <h2 className="text-xl font-semibold">4. Subscription & Payments</h2>
          <p>
            Some features require a paid subscription. By subscribing, you agree to pay all fees and taxes due.
          </p>

          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <p>
            All content and IP are owned by FreshAI or our licensors. You may not copy or reverse-engineer any part of the Service.
          </p>

          <h2 className="text-xl font-semibold">6. User Content</h2>
          <p>
            You retain rights to your content. We may use it only to operate and improve the service.
          </p>

          <h2 className="text-xl font-semibold">7. Termination</h2>
          <p>
            We may suspend or terminate your access for violations. You can close your account anytime.
          </p>

          <h2 className="text-xl font-semibold">8. Disclaimers</h2>
          <p>
            The Service is provided “as is.” We do not guarantee it will always be secure or error-free.
          </p>

          <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect or consequential damages arising from your use of the Service.
          </p>

          <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. You will be notified of material changes.
          </p>

          <h2 className="text-xl font-semibold">11. Contact Us</h2>
          <p>
            Questions? Email us at{' '}
            <a href="mailto:support@freshai.io" className="text-blue-600 underline">
              support@freshai.io
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
