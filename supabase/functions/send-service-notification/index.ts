import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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
    const { name, email, service, message } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MREWA Web Inquiry <onboarding@resend.dev>',
        to: 'ronold@mrewa.co.nz',
        subject: `NEW QUOTE REQUEST: ${service.toUpperCase()} - ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0f3d4a;">
            <h2 style="border-bottom: 2px solid #55b3c5; padding-bottom: 10px;">New Website Inquiry</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Service Requested:</strong> ${service}</p>
            <div style="background: #f7fbfc; padding: 15px; border-radius: 10px; margin-top: 20px;">
              <strong>Message/Details:</strong><br/>
              ${message}
            </div>
          </div>
        `,
      }),
    })

    const resData = await res.json()

    return new Response(JSON.stringify(resData), {
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