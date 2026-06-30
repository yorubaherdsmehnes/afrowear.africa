// lib/analytics.ts
import { sendGAEvent } from '@next/third-parties/google'

// ─────────────────────────────────────────────────────────────────────────
// GENERIC EVENT HELPERS
// Use these for ad-hoc tracking anywhere in the app. Named, purpose-built
// events (below) should be preferred where they already exist.
// ─────────────────────────────────────────────────────────────────────────

/** Low-level passthrough — fires any named GA4 event with arbitrary params. */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return
  sendGAEvent('event', eventName, params)
}

/**
 * Tracks ANY click — buttons, links, icons — identified by visible text/name.
 * `location` should describe where on the page this lives (e.g. "Hero",
 * "Navbar", "Grid Tile 3") so the same label (e.g. "Find Your Style") can be
 * distinguished across multiple placements.
 */
export const trackClick = (
  label: string,
  location: string,
  extra: Record<string, unknown> = {},
) => {
  trackEvent('click', {
    click_label: label,
    click_location: location,
    ...extra,
  })
}

/** Scroll depth milestones — fired once each per session as the user passes 25/50/75/100%. */
export const trackScrollDepth = (percent: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', { percent_scrolled: percent })
}

/** Fired the first time a named section enters the viewport. */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', { section_name: sectionName })
}

/** Fired when a named section leaves the viewport (or on unmount), with dwell time. */
export const trackSectionDwell = (sectionName: string, seconds: number) => {
  if (seconds < 1) return // ignore noise from rapid scroll-throughs
  trackEvent('section_dwell', {
    section_name: sectionName,
    dwell_seconds: Math.round(seconds),
  })
}

/** Generic form-field interaction tracker — focus, blur, or step change. */
export const trackFormInteraction = (
  formName: string,
  fieldOrStep: string,
  action: 'focus' | 'blur' | 'step_change' | 'error',
) => {
  trackEvent('form_interaction', {
    form_name: formName,
    field: fieldOrStep,
    action,
  })
}

/** Generic media/carousel/lightbox interaction tracker. */
export const trackMediaInteraction = (
  mediaName: string,
  action: 'open' | 'close' | 'next' | 'prev' | 'autoplay_pause',
  location: string,
) => {
  trackEvent('media_interaction', {
    media_name: mediaName,
    action,
    location,
  })
}

// 1. Track when a user views a specific bespoke option (e.g., Aso Oke, Silk-lace)
export const trackViewItem = (itemName: string, category: string, priceEstimate: number) => {
  sendGAEvent('event', 'view_item', {
    currency: 'USD',
    value: priceEstimate,
    items: [
      {
        item_name: itemName,
        item_category: category,
        price: priceEstimate,
      }
    ]
  })
}

// 2. Track when a user clicks "Share your vision" or opens the commission form
export const trackBeginCommission = (fabricPreference: string) => {
  sendGAEvent('event', 'begin_checkout', {
    custom_flow: 'bespoke_commission',
    fabric_preference: fabricPreference,
  })
}

// 3. Track when a user successfully submits their vision/commission request
export const trackGenerateLead = (leadType: 'consultation' | 'commission_request') => {
  sendGAEvent('event', 'generate_lead', {
    currency: 'USD',
    value: 500, // Assigned average expected value of a lead
    lead_type: leadType,
  })
}

// 4. Track when a client actually pays their deposit / completes checkout
export const trackDepositPaid = (transactionId: string, depositAmount: number, fabric: string) => {
  sendGAEvent('event', 'purchase', {
    transaction_id: transactionId,
    value: depositAmount,
    currency: 'USD',
    items: [
      {
        item_name: `Bespoke Commission Deposit`,
        item_category: fabric,
        price: depositAmount,
      }
    ]
  })
}