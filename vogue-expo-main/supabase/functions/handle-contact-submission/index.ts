import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Connect to SMTP server (configure with your email provider)
    const client = new SmtpClient()
    await client.connectTLS({
      hostname: Deno.env.get('SMTP_HOSTNAME') ?? '',
      port: parseInt(Deno.env.get('SMTP_PORT') ?? '587'),
      username: Deno.env.get('SMTP_USERNAME') ?? '',
      password: Deno.env.get('SMTP_PASSWORD') ?? '',
    })

    // Get the contact submission from the request
    const { record } = await req.json()

    // Send notification email to admin
    await client.send({
      from: "info@vegasvogueexpo.com",
      to: "info@vegasvogueexpo.com",
      subject: `New Contact Form Submission - ${record.interest}`,
      content: `
Name: ${record.name}
Email: ${record.email}
Company: ${record.company}
Phone: ${record.phone || 'Not provided'}
Interest: ${record.interest}

Message:
${record.message}
      `,
    })

    // Send auto-response to customer
    await client.send({
      from: "info@vegasvogueexpo.com",
      to: record.email,
      subject: "Thank you for contacting Vogue Expo",
      content: `
Dear ${record.name},

Thank you for contacting Vogue Expo. We have received your message and will get back to you within 24 hours.

Best regards,
The Vogue Expo Team
      `,
    })

    await client.close()

    return new Response(
      JSON.stringify({ message: 'Emails sent successfully' }),
      { headers: { 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
