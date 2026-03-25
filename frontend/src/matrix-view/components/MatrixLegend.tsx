/**
 * @fileoverview Color-scale legend for the ratings matrix heatmap.
 */
import { useTranslation } from 'react-i18next'

/**
 * Renders a horizontal gradient bar with labeled anchor points explaining
 * how cell colors correspond to rating values in the heatmap.
 */
export function MatrixLegend() {
  const { i18n } = useTranslation()
  const isSpanish = (i18n.resolvedLanguage ?? i18n.language).startsWith('es')
  const copy = isSpanish
    ? {
        title: 'Escala de color',
        unrated: '0 = Sin valorar',
        poor: '1 = Mala',
        average: '3 = Regular',
        excellent: '5 = Excelente',
      }
    : {
        title: 'Color Scale',
        unrated: '0 = Not rated',
        poor: '1 = Poor',
        average: '3 = Average',
        excellent: '5 = Excellent',
      }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {copy.title}
      </p>
      <div
        className="h-4 rounded-md mb-3"
        style={{
          background:
            'linear-gradient(to right, #1e293b 0%, #7f1d1d 25%, #ca8a04 55%, #166534 100%)',
        }}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{copy.unrated}</span>
        <span>{copy.poor}</span>
        <span>{copy.average}</span>
        <span>{copy.excellent}</span>
      </div>
    </div>
  )
}
