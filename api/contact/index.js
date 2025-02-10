const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const Joi = require('joi');

// Initialize SES client
const ses = new SESClient({ region: 'us-west-2' }); // Change to your AWS region

// Email validation schema
const schema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  company: Joi.string().required().min(2).max(100),
  phone: Joi.string().allow('').max(20),
  interest: Joi.string().required().valid('custom', 'modular', 'sustainable', 'full'),
  message: Joi.string().required().min(10).max(1000)
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://vegasvogueexpo.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Parse and validate request body
    const body = JSON.parse(event.body);
    const { error, value } = schema.validate(body);

    if (error) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: error.details[0].message })
      };
    }

    // Prepare email content
    const emailParams = {
      Source: 'info@vegasvogueexpo.com', // Your verified SES email
      Destination: {
        ToAddresses: ['info@vegasvogueexpo.com'] // Where you want to receive the emails
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission - ${value.interest}`
        },
        Body: {
          Text: {
            Data: `
Name: ${value.name}
Email: ${value.email}
Company: ${value.company}
Phone: ${value.phone || 'Not provided'}
Interest: ${value.interest}

Message:
${value.message}
            `
          }
        }
      }
    };

    // Send auto-response email to the customer
    const autoResponseParams = {
      Source: 'info@vegasvogueexpo.com',
      Destination: {
        ToAddresses: [value.email]
      },
      Message: {
        Subject: {
          Data: 'Thank you for contacting Vogue Expo'
        },
        Body: {
          Text: {
            Data: `
Dear ${value.name},

Thank you for contacting Vogue Expo. We have received your message and will get back to you within 24 hours.

Best regards,
The Vogue Expo Team
            `
          }
        }
      }
    };

    // Send both emails
    await Promise.all([
      ses.send(new SendEmailCommand(emailParams)),
      ses.send(new SendEmailCommand(autoResponseParams))
    ]);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
