export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      excuse_generations: {
        Row: {
          id: string
          created_at: string
          scenario: string
          relationship: string
          timing: string
          transport: string | null
          personal_context: string | null
          believability_level: string
          tone: string
          session_id: string | null
          generation_count: number
          user_agent: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          scenario: string
          relationship: string
          timing: string
          transport?: string | null
          personal_context?: string | null
          believability_level: string
          tone?: string
          session_id?: string | null
          generation_count?: number
          user_agent?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          scenario?: string
          relationship?: string
          timing?: string
          transport?: string | null
          personal_context?: string | null
          believability_level?: string
          tone?: string
          session_id?: string | null
          generation_count?: number
          user_agent?: string | null
          referrer?: string | null
        }
      }
      excuse_interactions: {
        Row: {
          id: string
          created_at: string
          generation_id: string
          action_type: string
          format_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          generation_id: string
          action_type: string
          format_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          generation_id?: string
          action_type?: string
          format_type?: string | null
        }
      }
      popular_scenarios: {
        Row: {
          id: string
          scenario: string
          total_generations: number
          updated_at: string
        }
        Insert: {
          id?: string
          scenario: string
          total_generations?: number
          updated_at?: string
        }
        Update: {
          id?: string
          scenario?: string
          total_generations?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
