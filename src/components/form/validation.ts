// Shared validation for the commission form.
// Imported by ConciergeForm.tsx (client-side UX checks) and
// api/commission/route.ts (server-side trust boundary).
// Keep the numbers here, not duplicated in both places.

export const NAME_MIN = 3
export const NAME_MAX = 35

export const VISION_MIN = 10
export const VISION_MAX = 1000

export function isValidName(raw: string): boolean {
  const trimmed = raw.trim()
  return trimmed.length >= NAME_MIN && trimmed.length <= NAME_MAX
}

// Strips spaces, dashes, brackets, parens, plus signs — confirms 7–15 digits remain.
// Deliberately loose: doesn't enforce a leading +, since the dial code is
// supplied separately by the country selector and concatenated before this runs.
export function isValidPhoneNumber(raw: string): boolean {
  const digits = raw.replace(/[\s\-().+]/g, '')
  return /^\d{7,15}$/.test(digits)
}

export function isValidVision(raw: string): boolean {
  const trimmed = raw.trim()
  return trimmed.length >= VISION_MIN && trimmed.length <= VISION_MAX
}

export interface CommissionPayload {
  full_name: string
  contact_number: string
  vision: string
  website?: string // honeypot — real users never see or fill this
}

export interface ValidationResult {
  valid: boolean
  errors: Partial<Record<'full_name' | 'contact_number' | 'vision', string>>
}

// Server-side validation — the trust boundary. Re-checks everything
// independently of whatever the client already did.
export function validateCommission(payload: Partial<CommissionPayload>): ValidationResult {
  const errors: ValidationResult['errors'] = {}

  if (!payload.full_name || !isValidName(payload.full_name)) {
    errors.full_name = `Name must be between ${NAME_MIN} and ${NAME_MAX} characters.`
  }
  if (!payload.contact_number || !isValidPhoneNumber(payload.contact_number)) {
    errors.contact_number = 'Please provide a valid phone number with country code.'
  }
  if (!payload.vision || !isValidVision(payload.vision)) {
    errors.vision = `Vision must be between ${VISION_MIN} and ${VISION_MAX} characters.`
  }

  return { valid: Object.keys(errors).length === 0, errors }
}