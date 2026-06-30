// components/analytics/ScrollDepthTracker.tsx
// Mount once near the root layout — has no UI, just fires scroll-depth events.
'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'

export default function ScrollDepthTracker() {
  useScrollDepth()
  return null
}
