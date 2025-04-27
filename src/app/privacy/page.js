'use client';

import { useEffect } from 'react';

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-sm mb-8 text-center text-gray-600">Last updated: April 26, 2025</p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to <strong>FreshAI</strong>! We value your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us, such as your name, email address, and payment
            information. We may also collect data automatically, such as usage information, device data, and cookies.
          </p>

          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, communicate with you, process transactions,
            and personalize your experience.
          </p>

          <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. However, we may share your information
            with trusted third-party service providers to help us operate our services.
          </p>

          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p>
            We implement security measures to protect your information. However, no method of transmission over the
            internet is 100% secure, and we cannot guarantee the absolute security of your data.
          </p>

          <h2 className="text-xl font-semibold">5. Cookies</h2>
          <p>
            We use cookies to enhance your experience. Cookies are small data files stored on your device. You can
            control cookie settings in your browser, but disabling cookies may limit some functionality of the service.
          </p>

          <h2 className="text-xl font-semibold">6. Your Data Rights</h2>
          <p>
            You have the right to access, update, and delete your personal information. You can also object to our
            processing of your data or request its transfer to another service provider.
          </p>

          <h2 className="text-xl font-semibold">7. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the
            updated policy will take effect as soon as it is published.
          </p>

          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact
            us at{' '}
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
