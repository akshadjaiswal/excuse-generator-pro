import { NextRequest, NextResponse } from 'next/server'
import { ExcuseGenerationSchema, type GeneratedExcuse, type ExcuseGenerationResponse } from '@/types/excuse'
import { buildExcusePrompt, getSystemPrompt } from '@/lib/utils/prompts'
import { trackExcuseGeneration, incrementScenarioCount } from '@/lib/supabase/db-helpers'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant' // Updated to working Groq model

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validationResult = ExcuseGenerationSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validationResult.error.errors.map(e => e.message).join(', '),
        },
        { status: 400 }
      )
    }

    const params = validationResult.data

    // Check for Groq API key
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    // Build the prompt
    const systemPrompt = getSystemPrompt()
    const userPrompt = buildExcusePrompt(params)

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 2000,
        top_p: 1,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Groq API error:', errorData)
      return NextResponse.json(
        {
          error: 'Failed to generate excuses',
          details: errorData.error?.message || 'Unknown error',
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    let excuses: GeneratedExcuse[]
    try {
      // Remove markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      excuses = JSON.parse(cleanedContent)
    } catch (parseError) {
      console.error('Failed to parse Groq response:', content)
      return NextResponse.json(
        {
          error: 'Failed to parse generated excuses',
          details: 'Invalid JSON response from AI',
        },
        { status: 500 }
      )
    }

    // Validate the structure
    if (!Array.isArray(excuses) || excuses.length === 0) {
      return NextResponse.json(
        { error: 'Invalid excuse format generated' },
        { status: 500 }
      )
    }

    // Generate a unique ID for this generation
    const generationId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    // Track in database (non-blocking)
    trackExcuseGeneration(params, generationId).catch(err =>
      console.error('Failed to track generation:', err)
    )
    incrementScenarioCount(params.scenario).catch(err =>
      console.error('Failed to increment scenario count:', err)
    )

    const responseData: ExcuseGenerationResponse = {
      excuses,
      generationId,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Excuse generation error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
