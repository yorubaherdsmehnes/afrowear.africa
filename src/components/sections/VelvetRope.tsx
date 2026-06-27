'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import ConciergeForm from '@/components/form/ConciergeForm'
import Confirmation from './Confirmation'
import type { FormStep } from '@/types'

export default function VelvetRope() {
  const [step, setStep] = useState<FormStep>('gate')

  return (
    <section id="commission" className="bg-forest px-6 md:px-16 py-32 min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto w-full">

        {step === 'gate' && (
          <div className="flex flex-col items-center gap-10 text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-sand">
              Shall we open the ledger<br />for your private commission?
            </h2>
            
            {/* UPDATED BUTTON CONTAINER */}
            <div className="flex flex-col items-center gap-4">
              <Button variant="filled" onClick={() => setStep('name')}>
                Yes, I have a vision
              </Button>
              
              <button 
                onClick={() => setStep('declined')}
                className="text-sm text-sand/50 hover:text-sand transition-colors underline decoration-transparent hover:decoration-sand underline-offset-4 mt-2"
              >
                No, I am just admiring
              </button>
            </div>
          </div>
        )}

        {step === 'declined' && (
          <p className="font-serif text-2xl text-sand/50 italic text-center">
            "Please, continue to admire. The atelier will be here when you are ready."
          </p>
        )}

        {['name', 'phone', 'vision'].includes(step) && (
          <ConciergeForm currentStep={step} onStepChange={setStep} />
        )}

        {step === 'success' && <Confirmation />}
      </div>
    </section>
  )
}