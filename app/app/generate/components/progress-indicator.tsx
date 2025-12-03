'use client'

import { useExcuseStore } from '@/lib/stores/excuse-store'
import { Target, Info, Sliders, Sparkles, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { number: 1, label: 'Situation', icon: Target },
  { number: 2, label: 'Context', icon: Info },
  { number: 3, label: 'Style', icon: Sliders },
  { number: 4, label: 'Results', icon: Sparkles },
]

export function ProgressIndicator() {
  const { currentStep } = useExcuseStore()

  return (
    <div className="w-full">
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300',
                    isCompleted && 'bg-accent text-white',
                    isActive && 'bg-primary text-white ring-4 ring-primary/20',
                    !isActive && !isCompleted && 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    (isActive || isCompleted) && 'text-dark',
                    !isActive && !isCompleted && 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-300',
                      isCompleted ? 'bg-accent' : 'bg-gray-200'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-center gap-4 mb-4">
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div
                key={step.number}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted && 'bg-accent text-white',
                  isActive && 'bg-primary text-white',
                  !isActive && !isCompleted && 'bg-gray-200 text-gray-400'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {currentStep} of {steps.length}:{' '}
            <span className="font-semibold text-dark">{steps[currentStep - 1].label}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
