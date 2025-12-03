'use client'

import { useExcuseStore } from '@/lib/stores/excuse-store'
import { SCENARIO_DEFINITIONS, type Scenario } from '@/types/excuse'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Briefcase,
  BookOpen,
  FileEdit,
  PartyPopper,
  Clock,
  Users,
  Cake,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const iconMap = {
  Briefcase,
  BookOpen,
  FileEdit,
  PartyPopper,
  Clock,
  Users,
  Cake,
  Sparkles,
}

export function Step1ScenarioSelection() {
  const { formData, updateFormData, goToNextStep } = useExcuseStore()

  const handleSelectScenario = (scenario: Scenario) => {
    updateFormData({ scenario })
  }

  const handleNext = () => {
    if (formData.scenario) {
      goToNextStep()
    }
  }

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
          What's the situation?
        </h2>
        <p className="text-gray-600">
          Pick the scenario that best fits your predicament
        </p>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SCENARIO_DEFINITIONS.map((scenario) => {
          const Icon = iconMap[scenario.icon as keyof typeof iconMap]
          const isSelected = formData.scenario === scenario.id

          return (
            <Card
              key={scenario.id}
              variant={isSelected ? 'bordered' : 'hover'}
              className={cn(
                'cursor-pointer text-center transition-all duration-300',
                isSelected && 'bg-primary text-white ring-2 ring-primary scale-105'
              )}
              onClick={() => handleSelectScenario(scenario.id)}
            >
              <div className={cn('mb-4', isSelected ? 'text-white' : 'text-primary')}>
                <Icon className="h-16 w-16 mx-auto" />
              </div>
              <h3
                className={cn(
                  'font-heading font-semibold mb-2',
                  isSelected ? 'text-white' : 'text-dark'
                )}
              >
                {scenario.title}
              </h3>
              <p className={cn('text-sm', isSelected ? 'text-white/90' : 'text-gray-600')}>
                {scenario.description}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!formData.scenario}
        >
          Next
        </Button>
      </div>
    </motion.div>
  )
}
