'use client'

import Link from 'next/link'
import { useExcuseStore } from '@/lib/stores/excuse-store'
import { Button } from '@/components/ui/button'
import { ProgressIndicator } from './components/progress-indicator'
import { Step1ScenarioSelection } from './components/step1-scenario-selection'
import { Step2ContextBuilder } from './components/step2-context-builder'
import { Step3StyleSelector } from './components/step3-style-selector'
import { Step4ResultsDisplay } from './components/step4-results-display'

export default function GeneratePage() {
  const { currentStep, reset } = useExcuseStore()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <h1 className="text-xl font-heading font-bold text-dark">
              Excuse Generator Pro
            </h1>
            <p className="text-sm text-gray-500">Your perfect excuse awaits</p>
          </Link>
          {currentStep > 1 && (
            <Button variant="ghost" onClick={reset} size="sm">
              Start Over
            </Button>
          )}
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ProgressIndicator />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {currentStep === 1 && <Step1ScenarioSelection />}
        {currentStep === 2 && <Step2ContextBuilder />}
        {currentStep === 3 && <Step3StyleSelector />}
        {currentStep === 4 && <Step4ResultsDisplay />}
      </div>
    </div>
  )
}
