import { createClient } from './client'
import type {
  ExcuseGenerationParams,
  ActionType,
  FormatType,
  Scenario,
} from '@/types/excuse'
import type { Database } from './database.types'

type ExcuseGenerationInsert = Database['public']['Tables']['excuse_generations']['Insert']
type ExcuseInteractionInsert = Database['public']['Tables']['excuse_interactions']['Insert']

/**
 * Generate a session ID for tracking anonymous users
 */
export function generateSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('excuse-session-id')

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem('excuse-session-id', sessionId)
  }

  return sessionId
}

/**
 * Track an excuse generation in the database
 */
export async function trackExcuseGeneration(
  params: ExcuseGenerationParams,
  generationId: string
): Promise<void> {
  try {
    const supabase = createClient()
    const sessionId = generateSessionId()

    const data: ExcuseGenerationInsert = {
      id: generationId,
      scenario: params.scenario,
      relationship: params.relationship,
      timing: params.timing,
      transport: params.transport || null,
      personal_context: params.personalContext || null,
      believability_level: params.believabilityLevel,
      tone: params.tone,
      session_id: sessionId,
      generation_count: 1,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      referrer: typeof window !== 'undefined' ? document.referrer : null,
    }

    const { error } = await supabase
      .from('excuse_generations')
      .insert(data)

    if (error) {
      console.error('Error tracking generation:', error)
      // Don't throw - analytics failure shouldn't break the app
    }
  } catch (error) {
    console.error('Error tracking generation:', error)
    // Don't throw - analytics failure shouldn't break the app
  }
}

/**
 * Track a user interaction with an excuse
 */
export async function trackExcuseInteraction(
  generationId: string,
  actionType: ActionType,
  formatType?: FormatType
): Promise<void> {
  try {
    const supabase = createClient()

    const data: ExcuseInteractionInsert = {
      generation_id: generationId,
      action_type: actionType,
      format_type: formatType || null,
    }

    const { error } = await supabase
      .from('excuse_interactions')
      .insert(data)

    if (error) {
      console.error('Error tracking interaction:', error)
      // Don't throw - analytics failure shouldn't break the app
    }
  } catch (error) {
    console.error('Error tracking interaction:', error)
    // Don't throw - analytics failure shouldn't break the app
  }
}

/**
 * Increment the generation count for a scenario
 */
export async function incrementScenarioCount(scenario: Scenario): Promise<void> {
  try {
    const supabase = createClient()

    // Try to get existing record
    const { data: existing } = await supabase
      .from('popular_scenarios')
      .select('*')
      .eq('scenario', scenario)
      .single()

    if (existing) {
      // Update existing
      await supabase
        .from('popular_scenarios')
        .update({
          total_generations: existing.total_generations + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('scenario', scenario)
    } else {
      // Insert new
      await supabase
        .from('popular_scenarios')
        .insert({
          scenario,
          total_generations: 1,
        })
    }
  } catch (error) {
    console.error('Error incrementing scenario count:', error)
    // Don't throw - analytics failure shouldn't break the app
  }
}

/**
 * Get popular scenarios
 */
export async function getPopularScenarios(limit = 5) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('popular_scenarios')
      .select('*')
      .order('total_generations', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting popular scenarios:', error)
    return []
  }
}
