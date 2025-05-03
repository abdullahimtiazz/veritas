import { MailService } from '@sendgrid/mail';

// Initialize SendGrid client with the API key
const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send a thank you email to the user who joined the waitlist
 * 
 * @param email - The recipient's email address
 * @returns Promise<boolean> - Whether the email was sent successfully
 */
export async function sendWaitlistConfirmation(email: string): Promise<boolean> {
  try {
    const params: EmailParams = {
      to: email,
      subject: "Welcome to the Veritas AI Waitlist!",
      text: 
`Thank you for joining the Veritas AI waitlist!

We're excited to have you on board and will notify you as soon as we launch. Veritas AI is designed to help you prepare for interviews with realistic AI-powered mock interviews.

Stay tuned for updates on our progress and early access opportunities.

The Veritas AI Team`,
      html: 
`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #7c3aed;
    }
    .content {
      padding: 20px 0;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #777;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #7c3aed;
      color: white !important;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to the Veritas AI Waitlist!</h1>
    </div>
    <div class="content">
      <p>Thank you for joining the Veritas AI waitlist!</p>
      <p>We're excited to have you on board and will notify you as soon as we launch. Veritas AI is designed to help you prepare for interviews with realistic AI-powered mock interviews.</p>
      <p>Stay tuned for updates on our progress and early access opportunities.</p>
    </div>
    <div class="footer">
      <p>The Veritas AI Team</p>
    </div>
  </div>
</body>
</html>`
    };

    // Use SendGrid to send the email
    const from = 'notifications@veritasai.example.com';
    await mailService.send({
      to: params.to,
      from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    
    console.log(`Confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}