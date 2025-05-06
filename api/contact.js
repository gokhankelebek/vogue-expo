const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Modified transporter to use a more reliable approach for development
let transporter;

// Check if we're in production with real credentials
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  // For development, log the email content instead of sending
  transporter = {
    sendMail: (mailOptions) => {
      console.log('==== EMAIL WOULD BE SENT IN PRODUCTION ====');
      console.log('From:', mailOptions.from);
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', mailOptions.html);
      console.log('=========================================');
      return Promise.resolve({ response: 'Development mode - email logged to console' });
    }
  };
}

router.post('/contact', async (req, res) => {
  const { name, email, company, phone, interest, message } = req.body;

  // Validate required fields
  if (!name || !email || !company || !interest || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    // Email content
    const mailOptions = {
      from: email,
      to: 'info@vogueexpo.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email (or log in development mode)
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
