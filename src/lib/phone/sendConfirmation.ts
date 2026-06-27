import type { CommissionRequest } from '@/types'

// Short-term: no automated message is sent. The commission lands in Supabase
// (commissions table) and the atelier reaches out personally on WhatsApp using
// contact_number — that first message is meant to be personal, not automated.
//
// Long-term plan (when volume justifies it): a Supabase Edge Function triggered
// on insert to `commissions`, using Resend (free tier, domain already needs
// verifying for professional email) to send the atelier an alert and, if a
// branded customer-facing confirmation is wanted later, a templated email.
// No Twilio/Meta WhatsApp API needed for that path — Resend handles the alert,
// the actual WhatsApp reply-out stays manual either way.
//
// This function is kept as a no-op so the import in api/commission/route.ts
// doesn't break, and so whoever picks this up next finds the plan, not dead code.
export async function sendConfirmationEmail(_data: CommissionRequest): Promise<void> {
  return
}