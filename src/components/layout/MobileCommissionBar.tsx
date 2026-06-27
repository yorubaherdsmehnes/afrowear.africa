'use client';

import { sendGAEvent } from "@next/third-parties/google";

// Fixed bottom bar on mobile — always-visible CTA
export default function MobileCommissionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <a
        href="/#discover"
        onClick={() => {
          sendGAEvent('event', 'select_content', { 
            content_type: 'cta', 
            item_id: 'Find Your Style', 
            location: 'Mobile Sticky Bar' 
          })
        }}
        className="block w-full bg-terracotta text-linen text-center font-sans text-sm uppercase tracking-widest py-4"
      >
        Find Your Style
      </a>
    </div>
  )
}