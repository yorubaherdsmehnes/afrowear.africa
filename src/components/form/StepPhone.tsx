'use client'

import { useEffect, useRef, useState } from 'react'
import { isValidPhoneNumber } from './validation'

// ─── Country list ─────────────────────────────────────────────────────────────
// Curated for Afrowear's audience: West Africa + diaspora hubs
// Nigeria pinned first, Other pinned last

interface Country {
  name: string
  code: string // dial code e.g. "+234"
  flag: string // emoji
}

const COUNTRIES: Country[] = [
  { name: 'Nigeria',              flag: '🇳🇬', code: '+234' },
  { name: 'Ghana',                flag: '🇬🇭', code: '+233' },
  { name: 'Senegal',              flag: '🇸🇳', code: '+221' },
  { name: "Côte d'Ivoire",        flag: '🇨🇮', code: '+225' },
  { name: 'Cameroon',             flag: '🇨🇲', code: '+237' },
  { name: 'Benin',                flag: '🇧🇯', code: '+229' },
  { name: 'Togo',                 flag: '🇹🇬', code: '+228' },
  { name: 'Sierra Leone',         flag: '🇸🇱', code: '+232' },
  { name: 'Liberia',              flag: '🇱🇷', code: '+231' },
  { name: 'Guinea',               flag: '🇬🇳', code: '+224' },
  { name: 'Kenya',                flag: '🇰🇪', code: '+254' },
  { name: 'South Africa',         flag: '🇿🇦', code: '+27'  },
  { name: 'Tanzania',             flag: '🇹🇿', code: '+255' },
  { name: 'Uganda',               flag: '🇺🇬', code: '+256' },
  { name: 'Ethiopia',             flag: '🇪🇹', code: '+251' },
  { name: 'Rwanda',               flag: '🇷🇼', code: '+250' },
  { name: 'Zimbabwe',             flag: '🇿🇼', code: '+263' },
  { name: 'Zambia',               flag: '🇿🇲', code: '+260' },
  { name: 'Egypt',                flag: '🇪🇬', code: '+20'  },
  { name: 'Morocco',              flag: '🇲🇦', code: '+212' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  { name: 'Saudi Arabia',         flag: '🇸🇦', code: '+966' },
  { name: 'Qatar',                flag: '🇶🇦', code: '+974' },
  { name: 'United Kingdom',       flag: '🇬🇧', code: '+44'  },
  { name: 'France',               flag: '🇫🇷', code: '+33'  },
  { name: 'Germany',              flag: '🇩🇪', code: '+49'  },
  { name: 'Netherlands',          flag: '🇳🇱', code: '+31'  },
  { name: 'Belgium',              flag: '🇧🇪', code: '+32'  },
  { name: 'Italy',                flag: '🇮🇹', code: '+39'  },
  { name: 'Spain',                flag: '🇪🇸', code: '+34'  },
  { name: 'Portugal',             flag: '🇵🇹', code: '+351' },
  { name: 'Sweden',               flag: '🇸🇪', code: '+46'  },
  { name: 'Norway',               flag: '🇳🇴', code: '+47'  },
  { name: 'Ireland',              flag: '🇮🇪', code: '+353' },
  { name: 'United States',        flag: '🇺🇸', code: '+1'   },
  { name: 'Canada',               flag: '🇨🇦', code: '+1'   },
  { name: 'Brazil',               flag: '🇧🇷', code: '+55'  },
  { name: 'Trinidad & Tobago',    flag: '🇹🇹', code: '+1868'},
  { name: 'Jamaica',              flag: '🇯🇲', code: '+1876'},
  { name: 'Australia',            flag: '🇦🇺', code: '+61'  },
  { name: 'New Zealand',          flag: '🇳🇿', code: '+64'  },
  { name: 'India',                flag: '🇮🇳', code: '+91'  },
  { name: 'China',                flag: '🇨🇳', code: '+86'  },
  { name: 'Japan',                flag: '🇯🇵', code: '+81'  },
  { name: 'Other',                flag: '🌍',  code: ''     },
]

interface Props {
  name:     string
  value:    string
  onChange: (v: string) => void
  onNext:   () => void
}

export default function StepPhone({ name, value, onChange, onNext }: Props) {
  const [selected,    setSelected]    = useState<Country>(COUNTRIES[0])
  const [customCode,  setCustomCode]  = useState('')
  const [number,      setNumber]      = useState('')
  const [open,        setOpen]        = useState(false)
  const [touched,     setTouched]     = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const dialCode = selected.name === 'Other' ? customCode : selected.code
  const combined = dialCode ? `${dialCode} ${number}`.trim() : number

  useEffect(() => {
    onChange(combined)
  }, [combined])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const showError = touched && number.length > 0 && !isValidPhoneNumber(number)

  const handleNext = () => {
    setTouched(true)
    if (combined.trim() && isValidPhoneNumber(number)) onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="font-serif text-3xl md:text-4xl text-sand">
        A pleasure, {name}.<br />What is your WhatsApp number?
      </label>

      <div
        className={`flex items-stretch border-b-2 transition-colors duration-300 ${
          open ? 'border-terracotta' : 'border-sand/20'
        }`}
      >
        <div ref={dropdownRef} className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-2 pr-4 pb-4 text-xl text-sand focus:outline-none"
          >
            <span>{selected.flag}</span>
            <span className="font-sans text-base text-sand/70 min-w-[3rem]">
              {selected.name === 'Other' ? (customCode || '+ ···') : selected.code}
            </span>
            <svg
              className={`w-3 h-3 text-sand/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-full left-0 z-50 mt-2 w-72 bg-forest border border-sand/10 overflow-y-auto max-h-72 scrollbar-none">
              {COUNTRIES.map(country => (
                <button
                  key={`${country.name}-${country.code}`}
                  type="button"
                  onClick={() => {
                    setSelected(country)
                    if (country.name !== 'Other') setCustomCode('')
                    setOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-sans text-sm text-left transition-colors duration-150 ${
                    selected.name === country.name
                      ? 'text-terracotta'
                      : 'text-sand/60 hover:text-sand'
                  } ${country.name === 'Other' ? 'border-t border-sand/10 mt-1' : ''}`}
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="flex-1 tracking-wide">{country.name}</span>
                  <span className="text-sand/30 font-mono text-xs">{country.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px bg-sand/10 mx-2 mb-4 self-stretch" />

        <input
          id="phone"
          type="tel"
          autoFocus={selected.name !== 'Other'}
          value={number}
          onChange={e => { setNumber(e.target.value); setTouched(true) }}
          onKeyDown={e => e.key === 'Enter' && handleNext()}
          className="flex-1 bg-transparent pb-4 text-xl text-sand focus:outline-none placeholder:text-sand/20"
          placeholder="800 000 0000"
        />
      </div>

      {selected.name === 'Other' && (
        <div className="flex items-center gap-3 border-b border-sand/10 pb-3">
          <span className="font-sans text-xs uppercase tracking-widest text-sand/30">
            Country code
          </span>
          <input
            type="text"
            autoFocus
            value={customCode}
            onChange={e => setCustomCode(e.target.value)}
            placeholder="+000"
            className="bg-transparent font-mono text-base text-sand focus:outline-none placeholder:text-sand/20 w-20"
          />
        </div>
      )}

      {showError ? (
        <p className="font-sans text-xs text-terracotta -mt-2">
          Please enter a valid phone number.
        </p>
      ) : (
        <p className="font-sans text-xs text-sand/30 -mt-2">
          Include your country code. We will reach out on WhatsApp within 48 hours.
        </p>
      )}
    </div>
  )
}