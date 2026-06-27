'use client'

import { useState } from 'react'
import AfricanDivider from '@/components/ui/AfricanDivider'
import Explore from '@/components/persona/Explore'
import Clash from '@/components/persona/Clash'

type Tab = 'explore' | 'clash'

const TABS: { key: Tab; label: string; description: string }[] = [
  {
    key: 'explore',
    label: 'Explore',
    description: 'All sixteen archetypes — browse, filter, and open any for a full profile.',
  },
  {
    key: 'clash',
    label: 'Clash',
    description: 'Pick two archetypes and see how they navigate the same social scenario.',
  },
]

export default function StylePersonaPage() {
  const [activeTab, setActiveTab] = useState<Tab>('explore')

  const current = TABS.find((t) => t.key === activeTab)!

  return (
    <>
      {/* Page header */}
      <div className="px-6 md:px-16 pt-32 pb-0">
        <AfricanDivider className="mb-12" />

        <p className="font-sans text-md uppercase tracking-widest text-terracotta mb-4">
          The Persona
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-sand leading-tight max-w-lg">
            Sixteen archetypes.<br />Which one is yours?
          </h1>
          <p className="font-sans text-sm text-sand/40 leading-relaxed max-w-sm md:text-right">
            Not sure yet?{' '}
            <a
              href="/#discover"
              className="text-sand/55 underline underline-offset-4 hover:text-terracotta transition-colors duration-200"
            >
              Take the quiz first
            </a>{' '}
            — five sliders, one result.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-sand/10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`
                relative px-8 py-4 font-sans text-xs tracking-widest uppercase
                transition-colors duration-200
                ${activeTab === tab.key
                  ? 'text-sand'
                  : 'text-sand/30 hover:text-sand/60'
                }
              `}
            >
              {tab.label}
              {/* Active underline */}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-terracotta" />
              )}
            </button>
          ))}

          {/* Tab description — fills remaining space, right-aligned */}
          <div className="flex-1 flex items-center justify-end pb-4">
            <p className="font-sans text-xs text-sand/25 tracking-wide hidden md:block">
              {current.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 md:px-16 py-16">
        {activeTab === 'explore' && <Explore />}
        {activeTab === 'clash'   && <Clash />}
      </div>
    </>
  )
}