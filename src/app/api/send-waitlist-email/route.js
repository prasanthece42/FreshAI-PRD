import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { email } = await req.json()

    const data = await resend.emails.send({
      from: 'FreshAI <support@freshai.io>',
      to: email,
      subject: 'Welcome to the FreshAI Waitlist!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #e0e7ff, #f4f7fc); padding: 40px 20px; margin: 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <h1 style="font-size: 28px; margin: 0; color: #2e2e2e;">Welcome to FreshAI 👋</h1>
                <p style="font-size: 16px; color: #555; margin-top: 15px; line-height: 1.6;">
                  Thanks for joining our exclusive waitlist!<br/>
                  You're officially on the path to experiencing the future of AI-driven customer support.
                </p>

                <div style="margin: 30px 0;">
                  <a href="https://freshai.io" style="padding: 14px 32px; background: #6246ea; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Visit FreshAI
                  </a>
                </div>

                <p style="font-size: 14px; color: #777; margin-top: 30px;">
                  Stay tuned – we’ll send you early access updates very soon 🚀
                </p>

                <p style="font-size: 14px; color: #aaa; margin-top: 20px;">
                  – The FreshAI Team
                </p>
              </td>
            </tr>
            <tr>
              <td style="background: #f9faff; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                You're receiving this email because you joined the FreshAI waitlist.<br/>
                <a href="#" style="color: #6246ea; text-decoration: underline;">Unsubscribe</a> if you no longer wish to hear from us.
              </td>
            </tr>
          </table>
        </div>
      `,
    })

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Resend Error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
