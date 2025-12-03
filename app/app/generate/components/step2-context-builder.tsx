'use client'

import { useExcuseStore } from '@/lib/stores/excuse-store'
import { RELATIONSHIPS, TIMING, TRANSPORT, SCENARIO_DEFINITIONS, type Relationship, type Timing, type Transport } from '@/types/excuse'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Briefcase, BookOpenText, Heart, Users, UserCircle, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const relationshipOptions = [
  { value: RELATIONSHIPS.BOSS, label: 'Boss', icon: '💼', description: 'Professional setting' },
  { value: RELATIONSHIPS.TEACHER, label: 'Teacher', icon: '📖', description: 'Academic context' },
  { value: RELATIONSHIPS.FRIEND, label: 'Friend', icon: '🤝', description: 'Casual and friendly' },
  { value: RELATIONSHIPS.PARTNER, label: 'Partner', icon: '❤️', description: 'Romantic relationship' },
  { value: RELATIONSHIPS.PARENT, label: 'Parent', icon: '👪', description: 'Family member' },
  { value: RELATIONSHIPS.OTHER, label: 'Other', icon: '🎯', description: 'Someone else' },
]

const timingOptions = [
  { value: TIMING.RIGHT_NOW, label: 'Right Now', icon: '⚡', description: 'Last minute, happening now' },
  { value: TIMING.FEW_HOURS_AGO, label: 'Few Hours Ago', icon: '🕐', description: 'Earlier today' },
  { value: TIMING.YESTERDAY, label: 'Yesterday', icon: '📅', description: 'It was yesterday' },
  { value: TIMING.LAST_WEEK, label: 'Last Week', icon: '📆', description: 'Several days ago' },
]

const transportOptions = [
  { value: TRANSPORT.DRIVE, label: 'Drive (Car)', icon: '🚗' },
  { value: TRANSPORT.PUBLIC_TRANSIT, label: 'Public Transit', icon: '🚇' },
  { value: TRANSPORT.WALK_BIKE, label: 'Walk/Bike', icon: '🚶' },
  { value: TRANSPORT.WORK_FROM_HOME, label: 'Work/Study from Home', icon: '🏠' },
]

export function Step2ContextBuilder() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useExcuseStore()

  const scenarioDefinition = SCENARIO_DEFINITIONS.find(s => s.id === formData.scenario)
  const showTransport = scenarioDefinition?.requiresTransport

  const handleNext = () => {
    if (formData.relationship && formData.timing) {
      goToNextStep()
    }
  }

  const canProceed = formData.relationship && formData.timing

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
          Tell us a bit more...
        </h2>
        <p className="text-gray-600">
          This helps make your excuse more believable and personalized
        </p>
      </div>

      {/* Section 1: Who Are You Telling? */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-dark mb-2">
              Who needs to hear this excuse?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose the person you'll be telling this to
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relationshipOptions.map((option) => {
              const isSelected = formData.relationship === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => updateFormData({ relationship: option.value as Relationship })}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  )}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-dark">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Timing */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-dark mb-2">
              When did this happen?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose the timeframe for your excuse
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timingOptions.map((option) => {
              const isSelected = formData.timing === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => updateFormData({ timing: option.value as Timing })}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all duration-200 text-center',
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                      : 'border-gray-200 hover:border-accent/50 hover:bg-gray-50'
                  )}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-dark text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Transportation (Conditional) */}
      {showTransport && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-dark mb-2">
                How do you usually get there?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This helps create more specific excuses
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transportOptions.map((option) => {
                const isSelected = formData.transport === option.value

                return (
                  <button
                    key={option.value}
                    onClick={() => updateFormData({ transport: option.value as Transport })}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all duration-200 text-center',
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    )}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-dark text-sm">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 4: Personal Context (Optional) */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-dark mb-2">
              Anything else we should know?{' '}
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add details like pets, kids, elderly parents - helps make it more believable
            </p>
          </div>

          <Textarea
            placeholder="e.g., I have a dog, elderly parent, live far away..."
            value={formData.personalContext}
            onChange={(e) => updateFormData({ personalContext: e.target.value })}
            maxLength={200}
            showCount
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={goToPreviousStep}>
          Back
        </Button>
        <Button size="lg" onClick={handleNext} disabled={!canProceed}>
          Next
        </Button>
      </div>
    </motion.div>
  )
}
