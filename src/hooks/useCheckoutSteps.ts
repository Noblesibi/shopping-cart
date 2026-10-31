import { useState } from 'react'

export const CHECKOUT_STEPS = ['Cart Review', 'Shipping', 'Payment'] as const

// Tracks which checkout step is shown (1-based) and keeps it in range.
export function useCheckoutSteps() {
  const [step, setStep] = useState(1)

  const next = () => setStep((s) => Math.min(s + 1, CHECKOUT_STEPS.length))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  return { step, next, back }
}
