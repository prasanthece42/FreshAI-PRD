// components/SEO.js

import Head from 'next/head';

export default function SEO({ 
  title = 'FreshAI - Your AI Customer Support Platform',
  description = 'Automate your customer support, marketing, and CRM with FreshAI. Boost sales, save time, and scale faster.',
  url = 'https://freshai.com', // Change to your real domain
  image = 'https://freshai.com/og-image.png', // Update with your real og:image
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </Head>
  );
}
