import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ExcuseGeneratorState,
  GeneratorStep,
  ExcuseFormData,
  GeneratedExcuse,
  TONE,
} from '@/types/excuse'

const initialFormData: ExcuseFormData = {
  scenario: null,
  relationship: null,
  timing: null,
  transport: null,
  personalContext: '',
  believabilityLevel: null,
  tone: 'casual' as typeof TONE.CASUAL,
}

export const useExcuseStore = create<ExcuseGeneratorState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      formData: initialFormData,
      generatedExcuses: null,
      generationId: null,
      isGenerating: false,
      error: null,

      // Actions
      setStep: (step: GeneratorStep) => {
        set({ currentStep: step, error: null })
      },

      updateFormData: (data: Partial<ExcuseFormData>) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
          error: null,
        }))
      },

      setGeneratedExcuses: (excuses: GeneratedExcuse[], generationId: string) => {
        set({
          generatedExcuses: excuses,
          generationId,
          isGenerating: false,
          error: null,
        })
      },

      setIsGenerating: (isGenerating: boolean) => {
        set({ isGenerating, error: null })
      },

      setError: (error: string | null) => {
        set({ error, isGenerating: false })
      },

      reset: () => {
        set({
          currentStep: 1,
          formData: initialFormData,
          generatedExcuses: null,
          generationId: null,
          isGenerating: false,
          error: null,
        })
      },

      goToNextStep: () => {
        const { currentStep } = get()
        if (currentStep < 4) {
          set({ currentStep: (currentStep + 1) as GeneratorStep, error: null })
        }
      },

      goToPreviousStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: (currentStep - 1) as GeneratorStep, error: null })
        }
      },
    }),
    {
      name: 'excuse-generator-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
)
