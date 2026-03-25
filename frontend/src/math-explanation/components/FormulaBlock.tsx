/**
 * @fileoverview Monospace formula display block used to present mathematical
 * notation in a visually distinct, code-like container.  
 */

/** Props accepted by the {@link FormulaBlock} component. */
interface FormulaBlockProps {
  /** The formula string to render. Plain text or ASCII math notation. */
  formula: string
  /** Optional caption displayed below the formula box in muted italic text. */
  caption?: string
}

/**
 * Renders a formula in a dark monospace block with a prominent indigo left border.
 * An optional descriptive caption is displayed beneath the block in muted text.
 *
 * @param props - {@link FormulaBlockProps}
 */
export function FormulaBlock({ formula, caption }: FormulaBlockProps) {
  return (
    <figure className="my-4">
      <div className="bg-slate-950 border-l-4 border-indigo-600 rounded-r-lg px-5 py-4 overflow-x-auto">
        <pre className="text-sm text-indigo-300 font-mono leading-relaxed whitespace-pre">
          {formula}
        </pre>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-slate-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
