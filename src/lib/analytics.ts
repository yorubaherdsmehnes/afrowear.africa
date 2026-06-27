// lib/analytics.ts
import { sendGAEvent } from '@next/third-parties/google'

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