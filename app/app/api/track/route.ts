import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { trackExcuseInteraction } from '@/lib/supabase/db-helpers'
import { ACTION_TYPE, FORMAT_TYPE } from '@/types/excuse'

const TrackingSchema = z.object({
  generationId: z.string(),
  actionType: z.enum([
    ACTION_TYPE.COPY,
    ACTION_TYPE.TWEAK,
    ACTION_TYPE.REGENERATE,
  ]),
  formatType: z.enum([
    FORMAT_TYPE.TEXT,
    FORMAT_TYPE.EMAIL,
    FORMAT_TYPE.VERBAL,
  ]).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = TrackingSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validationResult.error.errors.map(e => e.message).join(', '),
        },
        { status: 400 }
      )
    }

    const { generationId, actionType, formatType } = validationResult.data

    // Track the interaction (non-blocking)
    await trackExcuseInteraction(generationId, actionType, formatType)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Tracking error:', error)
    // Return success anyway - don't let analytics failures break UX
    return NextResponse.json({ success: true })
  }
}
