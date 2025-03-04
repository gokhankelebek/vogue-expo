const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client - You'll need to replace these with your actual credentials
// We're using environment variables as a best practice for security
const supabaseUrl = process.env.SUPABASE_URL || 'https://avsgsxwiovtdshzdgpbr.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2c2dzeHdpb3Z0ZHNoemRncGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNjIzMTUsImV4cCI6MjA1NDYzODMxNX0.PY2c_d56AJIDyuQK3csJ8eC89WtaP0yo7uADpCvSU14';

// Create the Supabase client with the provided credentials
let supabase = createClient(supabaseUrl, supabaseKey);

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
    // Store contact form submission in Supabase if client is initialized
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([
            { 
              name, 
              email, 
              company, 
              phone: phone || null, 
              interest, 
              message,
              status: 'new',
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) {
          console.error('Supabase error:', error);
          // Continue with email sending even if database storage fails
        } else {
          console.log('Contact form submission stored in Supabase:', data);
        }
      } catch (supabaseError) {
        console.error('Supabase operation failed:', supabaseError);
        // Continue with email sending even if Supabase fails
      }
    } else {
      console.log('Supabase client not initialized. Skipping database storage.');
    }

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
