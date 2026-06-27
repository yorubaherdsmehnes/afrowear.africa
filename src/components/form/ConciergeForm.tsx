'use client'
import { useState } from 'react'
import FormProgress from './FormProgress'
import StepName     from './StepName'
import StepPhone    from './StepPhone'
import StepVision   from './StepVision'
import Button       from '@/components/ui/Button'
import { isValidName, isValidPhoneNumber, isValidVision } from '@/components/form/validation'
import type { FormStep } from '@/types'
import { trackGenerateLead } from '@/lib/analytics' // <-- Premium Tracking Import

interface Props {
  currentStep: FormStep
  onStepChange: (step: FormStep) => void
}

export default function ConciergeForm({ currentStep, onStepChange }: Props) {
  const [name,          setName]          = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [vision,        setVision]        = useState('')
  const [website,       setWebsite]       = useState('') 
  const [isLoading,     setIsLoading]     = useState(false)
  const [error,         setError]         = useState('')

  const stepIndex = currentStep === 'name' ? 1 : currentStep === 'phone' ? 2 : 3

  const submit = async () => {
    setIsLoading(true)
    setError('')
    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          contact_number: contactNumber,
          vision,
          website, 
        }),
      })
      if (!res.ok) throw new Error()
      
      // GA4: High-Value Lead Tracked! 
      trackGenerateLead('commission_request')
      
      onStepChange('success')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <FormProgress current={stepIndex} total={3} />

      <div
        className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>

      {currentStep === 'name' && (
        <StepName
          value={name}
          onChange={setName}
          onNext={() => isValidName(name) && onStepChange('phone')}
        />
      )}
      {currentStep === 'phone' && (
        <StepPhone
          name={name}
          value={contactNumber}
          onChange={setContactNumber}
          onNext={() => isValidPhoneNumber(contactNumber) && onStepChange('vision')}
        />
      )}
      {currentStep === 'vision' && (
        <StepVision value={vision} onChange={setVision} onSubmit={submit} isLoading={isLoading} />
      )}

      {error && <p className="font-sans text-sm text-red-400">{error}</p>}

      <div className="flex justify-between items-center mt-4">
        {stepIndex > 1 ? (
          <button
            onClick={() => onStepChange(stepIndex === 2 ? 'name' : 'phone')}
            className="font-sans text-xs uppercase tracking-widest text-sand/40 hover:text-sand transition-colors"
          >
            Back
          </button>
        ) : <div />}

        {currentStep === 'vision' ? (
          <Button variant="filled" onClick={submit} disabled={isLoading || !isValidVision(vision)}>
            {isLoading ? 'Sealing...' : 'Seal the Request'}
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => {
              if (currentStep === 'name' && isValidName(name)) onStepChange('phone')
              if (currentStep === 'phone' && isValidPhoneNumber(contactNumber)) onStepChange('vision')
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}