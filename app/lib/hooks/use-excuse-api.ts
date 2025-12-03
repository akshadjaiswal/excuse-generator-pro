'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  ExcuseGenerationParams,
  ExcuseGenerationResponse,
  ActionType,
  FormatType,
} from '@/types/excuse'

interface TrackingParams {
  generationId: string
  actionType: ActionType
  formatType?: FormatType
}

/**
 * Hook for generating excuses
 */
export function useGenerateExcuse() {
  return useMutation<ExcuseGenerationResponse, Error, ExcuseGenerationParams>({
    mutationFn: async (params: ExcuseGenerationParams) => {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || 'Failed to generate excuses')
      }

      return response.json()
    },
    retry: 1,
    retryDelay: 1000,
  })
}

/**
 * Hook for tracking user interactions
 */
export function useTrackInteraction() {
  return useMutation<void, Error, TrackingParams>({
    mutationFn: async (params: TrackingParams) => {
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      // Don't throw on error - analytics shouldn't break UX
    },
    retry: false,
  })
}
