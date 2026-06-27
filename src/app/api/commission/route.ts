import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin }             from '@/lib/supabase/server'
import { sendConfirmationEmail }     from '@/lib/phone/sendConfirmation'
import { validateCommission }        from '@/components/form/validation'
import type { CommissionRequest }    from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: CommissionRequest & { website?: string } = await req.json()
    const { full_name, contact_number, vision, website } = body

    // Honeypot — a real visitor never sees or fills this field.
    // Pretend success so a bot has no signal to adapt against, but skip the insert entirely.
    if (typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Server is the trust boundary — re-validate independently of whatever the client already checked.
    const { valid, errors } = validateCommission({ full_name, contact_number, vision })
    if (!valid) {
      return NextResponse.json({ error: 'Invalid submission.', fields: errors }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('commissions')
      .insert([{
        full_name: full_name.trim(),
        contact_number: contact_number.trim(),
        vision: vision.trim(),
        status: 'pending',
        source: 'web',
      }])

    if (error) throw error

    await sendConfirmationEmail({ full_name, contact_number, vision })

    return NextResponse.json({ success: true }, { status: 200 })
  }  catch (err) {
    console.error('[commission/route]', err)
    const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    // NOTE: returning the raw error message to the client is a temporary
    // diagnostic step — swap back to a generic message once the real
    // cause is found and fixed, so internal error details aren't exposed
    // to end users in production.
    return NextResponse.json({ error: message }, { status: 500 })
  }
}