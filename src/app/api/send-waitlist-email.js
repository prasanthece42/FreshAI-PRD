import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    console.log('Received email:', email);
    console.log('Resend API key:', process.env.RESEND_API_KEY ? '✓ exists' : '❌ missing');

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // this is allowed for free Resend accounts
      to: email,
      subject: 'Welcome to FreshAI!',
      html: `<p>Thank you for joining the waitlist for <strong>FreshAI</strong>! We're excited to have you 🚀</p>`,
    });

    console.log('Email sent:', data);
    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return Response.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
