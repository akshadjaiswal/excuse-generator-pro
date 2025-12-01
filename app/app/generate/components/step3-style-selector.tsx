'use client'

import { useExcuseStore } from '@/lib/stores/excuse-store'
import { useGenerateExcuse } from '@/lib/hooks/use-excuse-api'
import { BELIEVABILITY_LEVEL, TONE, RELATIONSHIPS, type BelievabilityLevel, type Tone } from '@/types/excuse'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lightbulb, Laugh } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Loading, LOADING_MESSAGES } from '@/components/ui/loading'

const believabilityOptions = [
  {
    value: BELIEVABILITY_LEVEL.BELIEVABLE,
    title: 'Totally Plausible',
    percentage: '90%',
    icon: CheckCircle,
    iconColor: 'text-accent',
    bgColor: 'bg-accent/5',
    borderColor: 'border-accent',
    description: 'For serious situations where you need maximum credibility',
    example: '"I had a flat tire on the highway and had to wait for roadside assistance..."',
  },
  {
    value: BELIEVABILITY_LEVEL.CREATIVE,
    title: 'Unusual But Possible',
    percentage: '70%',
    icon: Lightbulb,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary',
    description: 'Perfect balance of interesting and believable',
    example: '"My neighbor\'s peacock escaped and I helped catch it before it caused chaos..."',
  },
  {
    value: BELIEVABILITY_LEVEL.RIDICULOUS,
    title: 'Pure Comedy Gold',
    percentage: '10%',
    icon: Laugh,
    iconColor: 'text-warning',
    bgColor: 'bg-warning/5',
    borderColor: 'border-warning',
    description: 'When you need a laugh or just don\'t care anymore',
    example: '"I was abducted by a time-traveling DeLorean and had to help prevent a temporal paradox..."',
  },
]

export function Step3StyleSelector() {
  const { formData, updateFormData, goToPreviousStep, setStep, setGeneratedExcuses, setError } = useExcuseStore()
  const generateMutation = useGenerateExcuse()

  const showFormalToggle = formData.relationship === RELATIONSHIPS.BOSS || formData.relationship === RELATIONSHIPS.TEACHER

  const handleGenerate = async () => {
    if (!formData.believabilityLevel || !formData.scenario || !formData.relationship || !formData.timing) {
      return
    }

    try {
      const result = await generateMutation.mutateAsync({
        scenario: formData.scenario,
        relationship: formData.relationship,
        timing: formData.timing,
        transport: formData.transport,
        personalContext: formData.personalContext,
        believabilityLevel: formData.believabilityLevel,
        tone: formData.tone,
      })

      setGeneratedExcuses(result.excuses, result.generationId)
      setStep(4)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate excuses')
    }
  }

  const canProceed = formData.believabilityLevel

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-h2 md:text-h2-mobile font-heading text-dark mb-3">
          How believable should this be?
        </h2>
        <p className="text-gray-600">
          Choose your excuse style - from totally legit to hilariously absurd
        </p>
      </div>

      {/* Believability Options */}
      {generateMutation.isPending ? (
        <div className="py-20">
          <Loading size="lg" messages={LOADING_MESSAGES} />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {believabilityOptions.map((option) => {
              const Icon = option.icon
              const isSelected = formData.believabilityLevel === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => updateFormData({ believabilityLevel: option.value as BelievabilityLevel })}
                  className="text-left"
                >
                  <Card
                    variant="hover"
                    className={cn(
                      'h-full transition-all duration-300',
                      isSelected && `ring-4 ring-offset-2 ${option.borderColor.replace('border-', 'ring-')} scale-105`
                    )}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className={cn('mx-auto w-fit', option.iconColor)}>
                        <Icon className="h-16 w-16" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-xl font-heading font-bold text-dark mb-1">
                          {option.title}
                        </h3>
                        <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 mb-3">
                          Believability: {option.percentage}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {option.description}
                        </p>
                      </div>

                      <div className={cn('p-4 rounded-lg', option.bgColor)}>
                        <p className="text-sm italic text-gray-700">
                          {option.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
            })}
          </div>

          {/* Tone Toggle (Conditional) */}
          {showFormalToggle && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="formal-tone"
                    checked={formData.tone === TONE.FORMAL}
                    onChange={(e) => updateFormData({ tone: e.target.checked ? TONE.FORMAL : TONE.CASUAL })}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="formal-tone" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-dark mb-1">
                      Make it more formal
                    </div>
                    <p className="text-sm text-gray-600">
                      Add professional language and structure appropriate for {formData.relationship === RELATIONSHIPS.BOSS ? 'your boss' : 'your teacher'}
                    </p>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {generateMutation.isError && (
            <Card className="border-red-500 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600 text-center">
                  {generateMutation.error?.message || 'Oops! Even our AI ran out of excuses. Mind trying again?'}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={goToPreviousStep} disabled={generateMutation.isPending}>
              Back
            </Button>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canProceed}
              loading={generateMutation.isPending}
            >
              {generateMutation.isPending ? 'Generating...' : 'Generate My Excuse'}
            </Button>
          </div>
        </>
      )}
    </motion.div>
  )
}
