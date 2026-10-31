import { CHECKOUT_STEPS } from '../../hooks/useCheckoutSteps'

type StepIndicatorProps = {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="mb-6 flex gap-2">
      {CHECKOUT_STEPS.map((label, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isDone = stepNumber < currentStep
        return (
          <li
            key={label}
            aria-current={isActive ? 'step' : undefined}
            className={`flex-1 border-t-4 pt-2 text-sm ${
              isActive || isDone ? 'border-blue-600 text-blue-700' : 'border-gray-200 text-gray-500'
            } ${isActive ? 'font-semibold' : ''}`}
          >
            {stepNumber}. {label}
          </li>
        )
      })}
    </ol>
  )
}
