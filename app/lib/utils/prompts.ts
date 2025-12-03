import type { ExcuseGenerationParams, BelievabilityLevel } from '@/types/excuse'

const SYSTEM_PROMPT = `You are a creative excuse generator that crafts natural, human-sounding excuses.

CRITICAL RULES:
- Sound conversational, not robotic or AI-generated
- Use natural filler words when appropriate: "um", "like", "basically", "honestly"
- Include specific, believable details
- Vary sentence structure (not all perfect grammar)
- Add emotional context naturally
- Never use corporate AI phrases like "I hope this finds you well", "I wanted to reach out", "as per"
- Make it sound like a real person wrote it

Output format: Generate 3 different excuse variations in JSON format.`

const BELIEVABILITY_INSTRUCTIONS: Record<BelievabilityLevel, string> = {
  believable: `
    - Use common, everyday occurrences
    - Keep it simple and straightforward
    - Include 1-2 specific details
    - Sound genuinely apologetic if appropriate
    - 90% believability - this should be very plausible
    - Avoid anything too unusual or coincidental
  `,
  creative: `
    - Create an unusual but possible chain of events
    - Include 2-3 specific details
    - Has a mini story arc
    - Mix mundane with unexpected
    - 70% believability - interesting but technically possible
    - Make it memorable without being unbelievable
  `,
  ridiculous: `
    - Go wild with absurdist humor
    - Pop culture references welcome
    - Over-the-top scenarios
    - Self-aware comedy
    - 10% believability - pure entertainment
    - Make people laugh, not believe
  `,
}

function getScenarioContext(scenario: string): string {
  const contexts: Record<string, string> = {
    late_to_work: 'being late to work or a professional obligation',
    missed_class: 'missing a class or lecture',
    forgot_assignment: 'not completing or forgetting an assignment',
    social_event_bail: 'canceling on social plans or events',
    missed_deadline: 'missing a work or project deadline',
    family_skip: 'not attending a family event or gathering',
    forgot_special_date: 'forgetting an anniversary, birthday, or special date',
    general_purpose: 'a general situation that needs explanation',
  }
  return contexts[scenario] || 'a general situation'
}

function getRelationshipContext(relationship: string): string {
  const contexts: Record<string, string> = {
    boss: 'your boss or supervisor (professional tone appropriate)',
    teacher: 'your teacher or professor (respectful but can be casual)',
    friend: 'your friend (casual and friendly)',
    partner: 'your romantic partner (personal and sincere)',
    parent: 'your parent (respectful but familiar)',
    other: 'someone you know',
  }
  return contexts[relationship] || 'someone'
}

function getTimingContext(timing: string): string {
  const contexts: Record<string, string> = {
    right_now: 'happening right now (urgent, immediate)',
    few_hours_ago: 'happened a few hours ago (recent)',
    yesterday: 'happened yesterday (past tense)',
    last_week: 'happened last week (further in the past)',
  }
  return contexts[timing] || 'recently'
}

export function buildExcusePrompt(params: ExcuseGenerationParams): string {
  const scenarioContext = getScenarioContext(params.scenario)
  const relationshipContext = getRelationshipContext(params.relationship)
  const timingContext = getTimingContext(params.timing)

  const believabilityInstructions = BELIEVABILITY_INSTRUCTIONS[params.believabilityLevel]
  const toneInstruction = params.tone === 'formal'
    ? 'Use professional and respectful language throughout'
    : 'Use casual and friendly language'

  let prompt = `Generate 3 different excuses for this situation:

SCENARIO: ${scenarioContext}
TELLING TO: ${relationshipContext}
WHEN IT HAPPENED: ${timingContext}
${params.transport ? `TRANSPORTATION: ${params.transport}` : ''}
${params.personalContext ? `PERSONAL CONTEXT: ${params.personalContext}` : ''}

BELIEVABILITY LEVEL: ${params.believabilityLevel}
${believabilityInstructions}

TONE: ${toneInstruction}

For each excuse, provide:
1. Main excuse text (2-4 sentences that explain the situation)
2. A believability score (1-10)
3. A humorous believability label
4. Three different formats:
   - Text message version (casual, 2-3 sentences, like texting a friend)
   - Email version (include subject line and structured body)
   - Verbal version (conversational with natural pauses like "um", "like", "...", shows how you'd say it out loud)

Return as a JSON array with this EXACT structure:
[
  {
    "id": "variation-1",
    "mainExcuse": "The main excuse explanation here...",
    "believabilityScore": 8,
    "believabilityLabel": "Pretty convincing stuff",
    "formats": {
      "text": "Hey, I'm so sorry but...",
      "email": {
        "subject": "Subject line here",
        "body": "Email body here with greeting and proper structure..."
      },
      "verbal": "So, um, I wanted to tell you that... like... yeah."
    }
  }
]

IMPORTANT REMINDERS:
- Each variation should use a DIFFERENT approach/angle to the same situation
- Make them sound like a REAL PERSON wrote them, not an AI
- Include natural language imperfections where appropriate
- Be SPECIFIC to the context provided
${params.believabilityLevel === 'ridiculous' ? '- Go WILD with humor and absurdity' : ''}
- Return ONLY valid JSON, no markdown formatting or code blocks
- Use double quotes for JSON strings
- Escape any quotes inside strings properly`

  return prompt
}

export function getSystemPrompt(): string {
  return SYSTEM_PROMPT
}

export function calculateBelievabilityScore(level: BelievabilityLevel): number {
  const scores: Record<BelievabilityLevel, number> = {
    believable: Math.floor(Math.random() * 2) + 8, // 8-9
    creative: Math.floor(Math.random() * 3) + 5, // 5-7
    ridiculous: Math.floor(Math.random() * 3) + 1, // 1-3
  }
  return scores[level]
}
