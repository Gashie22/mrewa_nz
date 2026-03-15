import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Grab variables from Supabase Secrets
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const MREWA_EMAIL = Deno.env.get('MREWA_EMAIL')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, service, message, phone } = await req.json()

    // Determine subject line based on the source
    const isCallback = service === 'CALLBACK_REQUEST'
    const subject = isCallback 
      ? `🚨 URGENT: Callback Requested - ${name}` 
      : `New Quote Request: ${service.toUpperCase()} - ${name}`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Use 'onboarding@resend.dev' until your custom domain is verified in Resend
        from: 'MREWA Technical Portal <onboarding@resend.dev>',
        to: MREWA_EMAIL, 
        reply_to: email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #0f3d4a; padding: 20px; text-align: center;">
              <h1 style="color: #a8e6cf; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">MREWA Technical Services</h1>
            </div>
            <div style="padding: 30px; color: #333;">
              <h2 style="color: #0f3d4a; margin-top: 0;">${isCallback ? 'Urgent Callback Request' : 'New Website Inquiry'}</h2>
              <p><strong>Client Name:</strong> ${name}</p>
              <p><strong>Client Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone Number:</strong> ${phone}</p>` : ''}
              <p><strong>Service Type:</strong> ${service}</p>
              <div style="background: #f7fbfc; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #55b3c5;">
                <strong>Message Details:</strong><br/>
                ${message}
              </div>
            </div>
            <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              This inquiry was generated from the MREWA Technical Services website.
            </div>
          </div>
        `,
      }),
    })

    const resData = await res.json()

    if (!res.ok) throw new Error(JSON.stringify(resData))

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})