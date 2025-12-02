import { z } from 'zod'

// Enums and Constants
export const SCENARIOS = {
  LATE_TO_WORK: 'late_to_work',
  MISSED_CLASS: 'missed_class',
  FORGOT_ASSIGNMENT: 'forgot_assignment',
  SOCIAL_EVENT_BAIL: 'social_event_bail',
  MISSED_DEADLINE: 'missed_deadline',
  FAMILY_SKIP: 'family_skip',
  FORGOT_SPECIAL_DATE: 'forgot_special_date',
  GENERAL_PURPOSE: 'general_purpose',
} as const

export const RELATIONSHIPS = {
  BOSS: 'boss',
  TEACHER: 'teacher',
  FRIEND: 'friend',
  PARTNER: 'partner',
  PARENT: 'parent',
  OTHER: 'other',
} as const

export const TIMING = {
  RIGHT_NOW: 'right_now',
  FEW_HOURS_AGO: 'few_hours_ago',
  YESTERDAY: 'yesterday',
  LAST_WEEK: 'last_week',
} as const

export const TRANSPORT = {
  DRIVE: 'drive',
  PUBLIC_TRANSIT: 'public_transit',
  WALK_BIKE: 'walk_bike',
  WORK_FROM_HOME: 'work_from_home',
} as const

export const BELIEVABILITY_LEVEL = {
  BELIEVABLE: 'believable',
  CREATIVE: 'creative',
  RIDICULOUS: 'ridiculous',
} as const

export const TONE = {
  CASUAL: 'casual',
  FORMAL: 'formal',
} as const

export const FORMAT_TYPE = {
  TEXT: 'text',
  EMAIL: 'email',
  VERBAL: 'verbal',
} as const

export const ACTION_TYPE = {
  COPY: 'copy',
  TWEAK: 'tweak',
  REGENERATE: 'regenerate',
} as const

// Type aliases
export type Scenario = typeof SCENARIOS[keyof typeof SCENARIOS]
export type Relationship = typeof RELATIONSHIPS[keyof typeof RELATIONSHIPS]
export type Timing = typeof TIMING[keyof typeof TIMING]
export type Transport = typeof TRANSPORT[keyof typeof TRANSPORT]
export type BelievabilityLevel = typeof BELIEVABILITY_LEVEL[keyof typeof BELIEVABILITY_LEVEL]
export type Tone = typeof TONE[keyof typeof TONE]
export type FormatType = typeof FORMAT_TYPE[keyof typeof FORMAT_TYPE]
export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE]

// Scenario Definitions
export interface ScenarioDefinition {
  id: Scenario
  title: string
  description: string
  icon: string
  emoji: string
  requiresTransport?: boolean
}

export const SCENARIO_DEFINITIONS: ScenarioDefinition[] = [
  {
    id: SCENARIOS.LATE_TO_WORK,
    title: 'Late to Work',
    description: 'Traffic, alarms, and other morning mysteries',
    icon: 'Briefcase',
    emoji: '🏢',
    requiresTransport: true,
  },
  {
    id: SCENARIOS.MISSED_CLASS,
    title: 'Missed Class',
    description: "Why you weren't in that important lecture",
    icon: 'BookOpen',
    emoji: '📚',
  },
  {
    id: SCENARIOS.FORGOT_ASSIGNMENT,
    title: 'Forgot Assignment',
    description: 'Homework? What homework?',
    icon: 'FileEdit',
    emoji: '✍️',
  },
  {
    id: SCENARIOS.SOCIAL_EVENT_BAIL,
    title: 'Bailing on Plans',
    description: "Can't make it to that party or hangout",
    icon: 'PartyPopper',
    emoji: '🎉',
  },
  {
    id: SCENARIOS.MISSED_DEADLINE,
    title: 'Missed Deadline',
    description: 'Project delays and missed timelines',
    icon: 'Clock',
    emoji: '⏰',
  },
  {
    id: SCENARIOS.FAMILY_SKIP,
    title: 'Skip Family Event',
    description: "Can't make family dinner or gathering",
    icon: 'Users',
    emoji: '👨‍👩‍👧',
  },
  {
    id: SCENARIOS.FORGOT_SPECIAL_DATE,
    title: 'Forgot Anniversary/Birthday',
    description: 'Special dates that somehow slipped by',
    icon: 'Cake',
    emoji: '🎂',
  },
  {
    id: SCENARIOS.GENERAL_PURPOSE,
    title: 'General Purpose',
    description: 'Custom situation - anything goes',
    icon: 'Sparkles',
    emoji: '🎭',
  },
]

// Zod Schemas for Validation
export const ExcuseGenerationSchema = z.object({
  scenario: z.enum([
    SCENARIOS.LATE_TO_WORK,
    SCENARIOS.MISSED_CLASS,
    SCENARIOS.FORGOT_ASSIGNMENT,
    SCENARIOS.SOCIAL_EVENT_BAIL,
    SCENARIOS.MISSED_DEADLINE,
    SCENARIOS.FAMILY_SKIP,
    SCENARIOS.FORGOT_SPECIAL_DATE,
    SCENARIOS.GENERAL_PURPOSE,
  ]),
  relationship: z.enum([
    RELATIONSHIPS.BOSS,
    RELATIONSHIPS.TEACHER,
    RELATIONSHIPS.FRIEND,
    RELATIONSHIPS.PARTNER,
    RELATIONSHIPS.PARENT,
    RELATIONSHIPS.OTHER,
  ]),
  timing: z.enum([
    TIMING.RIGHT_NOW,
    TIMING.FEW_HOURS_AGO,
    TIMING.YESTERDAY,
    TIMING.LAST_WEEK,
  ]),
  transport: z.enum([
    TRANSPORT.DRIVE,
    TRANSPORT.PUBLIC_TRANSIT,
    TRANSPORT.WALK_BIKE,
    TRANSPORT.WORK_FROM_HOME,
  ]).optional(),
  personalContext: z.string().max(200).optional(),
  believabilityLevel: z.enum([
    BELIEVABILITY_LEVEL.BELIEVABLE,
    BELIEVABILITY_LEVEL.CREATIVE,
    BELIEVABILITY_LEVEL.RIDICULOUS,
  ]),
  tone: z.enum([TONE.CASUAL, TONE.FORMAL]).default(TONE.CASUAL),
})

export type ExcuseGenerationParams = z.infer<typeof ExcuseGenerationSchema>

// Excuse Format Types
export interface EmailFormat {
  subject: string
  body: string
}

export interface ExcuseFormats {
  text: string
  email: EmailFormat
  verbal: string
}

export interface GeneratedExcuse {
  id: string
  mainExcuse: string
  believabilityScore: number
  believabilityLabel: string
  formats: ExcuseFormats
}

export interface ExcuseGenerationResponse {
  excuses: GeneratedExcuse[]
  generationId: string
}

// Database Types (matching Supabase schema)
export interface ExcuseGenerationRecord {
  id: string
  created_at: string
  scenario: Scenario
  relationship: Relationship
  timing: Timing
  transport?: Transport
  personal_context?: string
  believability_level: BelievabilityLevel
  tone: Tone
  session_id?: string
  generation_count: number
  user_agent?: string
  referrer?: string
}

export interface ExcuseInteractionRecord {
  id: string
  created_at: string
  generation_id: string
  action_type: ActionType
  format_type?: FormatType
}

export interface PopularScenarioRecord {
  id: string
  scenario: Scenario
  total_generations: number
  updated_at: string
}

// UI State Types
export type GeneratorStep = 1 | 2 | 3 | 4

export interface ExcuseFormData {
  // Step 1
  scenario: Scenario | null

  // Step 2
  relationship: Relationship | null
  timing: Timing | null
  transport: Transport | null
  personalContext: string

  // Step 3
  believabilityLevel: BelievabilityLevel | null
  tone: Tone
}

export interface ExcuseGeneratorState {
  // Current step
  currentStep: GeneratorStep

  // Form data
  formData: ExcuseFormData

  // Generated excuses
  generatedExcuses: GeneratedExcuse[] | null
  generationId: string | null

  // UI state
  isGenerating: boolean
  error: string | null

  // Actions
  setStep: (step: GeneratorStep) => void
  updateFormData: (data: Partial<ExcuseFormData>) => void
  setGeneratedExcuses: (excuses: GeneratedExcuse[], generationId: string) => void
  setIsGenerating: (isGenerating: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

// API Error Response
export interface APIErrorResponse {
  error: string
  details?: string
}

// Believability Labels
export const BELIEVABILITY_LABELS: Record<number, string> = {
  10: "Your grandma would believe this",
  9: "Oscars not required",
  8: "Pretty convincing stuff",
  7: "Only slight skepticism expected",
  6: "Might raise an eyebrow",
  5: "Commit to the story",
  4: "Creative liberties taken",
  3: "Straight face required",
  2: "Pure comedy - act accordingly",
  1: "Don't even try to sell it",
}

export function getBelievabilityLabel(score: number): string {
  return BELIEVABILITY_LABELS[score] || BELIEVABILITY_LABELS[5]
}
