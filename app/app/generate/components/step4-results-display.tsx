'use client'

import { useState } from 'react'
import { useExcuseStore } from '@/lib/stores/excuse-store'
import { useGenerateExcuse, useTrackInteraction } from '@/lib/hooks/use-excuse-api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { getBelievabilityLabel, type GeneratedExcuse, type FormatType, FORMAT_TYPE, ACTION_TYPE, SCENARIO_DEFINITIONS } from '@/types/excuse'
import { Loading, LOADING_MESSAGES } from '@/components/ui/loading'

export function Step4ResultsDisplay() {
  const { generatedExcuses, generationId, formData, reset, setGeneratedExcuses, setError } = useExcuseStore()
  const generateMutation = useGenerateExcuse()
  const trackMutation = useTrackInteraction()

  if (!generatedExcuses || generatedExcuses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">No excuses generated yet</p>
        <Button onClick={reset}>Start Over</Button>
      </div>
    )
  }

  const scenarioDefinition = SCENARIO_DEFINITIONS.find(s => s.id === formData.scenario)

  const handleRegenerate = async () => {
    if (!formData.believabilityLevel || !formData.scenario || !formData.relationship || !formData.timing) {
      return
    }

    try {
      const result = await generateMutation.mutateAsync({
        scenario: formData.scenario,
        relationship: formData.relationship,
        timing: formData.timing,
        transport: formData.transport || undefined,
        personalContext: formData.personalContext,
        believabilityLevel: formData.believabilityLevel,
        tone: formData.tone,
      })

      setGeneratedExcuses(result.excuses, result.generationId)

      // Track regeneration
      if (generationId) {
        trackMutation.mutate({
          generationId,
          actionType: ACTION_TYPE.REGENERATE,
        })
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate excuses')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Context Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{scenarioDefinition?.emoji}</span>
            <div>
              <p className="text-sm text-gray-600">
                Your excuse for:{' '}
                <span className="font-semibold text-dark">{scenarioDefinition?.title}</span>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            Start Over
          </Button>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-h2 md:text-h2-mobile font-heading text-dark mb-3">
          Your Perfect Excuses
        </h2>
        <p className="text-gray-600">
          Pick your favorite or try again for more options
        </p>
      </div>

      {/* Loading State */}
      {generateMutation.isPending && (
        <div className="py-20">
          <Loading size="lg" messages={LOADING_MESSAGES} />
        </div>
      )}

      {/* Excuse Cards */}
      {!generateMutation.isPending && (
        <div className="space-y-6">
          {generatedExcuses.map((excuse, index) => (
            <ExcuseCard
              key={excuse.id || index}
              excuse={excuse}
              generationId={generationId || ''}
              trackMutation={trackMutation}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {!generateMutation.isPending && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleRegenerate}
            disabled={generateMutation.isPending}
          >
            <RefreshCw className={cn('mr-2 h-5 w-5', generateMutation.isPending && 'animate-spin')} />
            Generate More Variations
          </Button>
          <Button variant="ghost" size="lg" onClick={reset}>
            Try Different Scenario
          </Button>
        </div>
      )}
    </motion.div>
  )
}

function ExcuseCard({
  excuse,
  generationId,
  trackMutation,
}: {
  excuse: GeneratedExcuse
  generationId: string
  trackMutation: ReturnType<typeof useTrackInteraction>
}) {
  const [activeFormat, setActiveFormat] = useState<FormatType>(FORMAT_TYPE.TEXT)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    let textToCopy = ''

    if (activeFormat === FORMAT_TYPE.TEXT) {
      textToCopy = excuse.formats.text
    } else if (activeFormat === FORMAT_TYPE.EMAIL) {
      textToCopy = `Subject: ${excuse.formats.email.subject}\n\n${excuse.formats.email.body}`
    } else {
      textToCopy = excuse.formats.verbal
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)

      // Track copy interaction
      trackMutation.mutate({
        generationId,
        actionType: ACTION_TYPE.COPY,
        formatType: activeFormat,
      })
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const believabilityPercentage = (excuse.believabilityScore / 10) * 100

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">Excuse Variation</CardTitle>
            <div className="space-y-2">
              {/* Believability Meter */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Believability</span>
                  <span className="font-semibold text-dark">{excuse.believabilityScore}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      excuse.believabilityScore >= 7 && 'bg-accent',
                      excuse.believabilityScore >= 4 && excuse.believabilityScore < 7 && 'bg-primary',
                      excuse.believabilityScore < 4 && 'bg-warning'
                    )}
                    style={{ width: `${believabilityPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 italic">
                  "{excuse.believabilityLabel || getBelievabilityLabel(excuse.believabilityScore)}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Format Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveFormat(FORMAT_TYPE.TEXT)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors relative',
              activeFormat === FORMAT_TYPE.TEXT
                ? 'text-primary'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Text Message
            {activeFormat === FORMAT_TYPE.TEXT && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveFormat(FORMAT_TYPE.EMAIL)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors relative',
              activeFormat === FORMAT_TYPE.EMAIL
                ? 'text-primary'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Email
            {activeFormat === FORMAT_TYPE.EMAIL && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveFormat(FORMAT_TYPE.VERBAL)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors relative',
              activeFormat === FORMAT_TYPE.VERBAL
                ? 'text-primary'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Verbal
            {activeFormat === FORMAT_TYPE.VERBAL && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Excuse Content */}
        <div className="bg-secondary-100 rounded-lg p-4 min-h-[120px]">
          {activeFormat === FORMAT_TYPE.TEXT && (
            <p className="text-dark whitespace-pre-wrap">{excuse.formats.text}</p>
          )}
          {activeFormat === FORMAT_TYPE.EMAIL && (
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-600">Subject: </span>
                <span className="text-dark">{excuse.formats.email.subject}</span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <p className="text-dark whitespace-pre-wrap">{excuse.formats.email.body}</p>
              </div>
            </div>
          )}
          {activeFormat === FORMAT_TYPE.VERBAL && (
            <p className="text-dark whitespace-pre-wrap italic">{excuse.formats.verbal}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            className="flex-1"
            variant={copied ? 'success' : 'default'}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Copied! Good luck out there
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
