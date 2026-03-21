/**
 * @fileoverview Numbered step section used to break the math explanation
 * walkthrough into discrete, digestible algorithm phases.
 */
import { FormulaBlock } from './FormulaBlock'
import type { MathStep } from '../types/svd.types'

/** Props accepted by the {@link StepSection} component. */
interface StepSectionProps {
  /** The full step data to render. */
  step: MathStep
}

/**
 * Renders a single numbered step in the math explanation walkthrough.
 * The step number appears in a large indigo circle on the left; a vertical
 * connector line links visually to the next step below. The right column
 * contains the step title, description paragraph, an optional formula block,
 * and an optional highlighted example note.
 *
 * @param props - {@link StepSectionProps}
 */
export function StepSection({ step }: StepSectionProps) {
  return (
    <section className="flex gap-5">
      {/* Step indicator column */}
      <div className="flex flex-col items-center shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-md">
          {step.number}
        </div>
        <div className="flex-1 w-px bg-slate-800 mt-3" />
      </div>

      {/* Content column */}
      <div className="flex-1 pb-10 min-w-0">
        <h3 className="text-base font-semibold text-slate-100 mt-1.5 mb-3">{step.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>

        {step.formula && (
          <FormulaBlock formula={step.formula} />
        )}

        {step.example && (
          <div className="mt-3 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Example: </span>
              {step.example}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
