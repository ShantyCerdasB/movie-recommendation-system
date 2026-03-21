/**
 * @fileoverview Card listing the known limitations of user-based collaborative filtering.
 */
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../../shared/components/ui/Card'

/**
 * Renders a styled card listing the key limitations of user-based collaborative
 * filtering, each presented as a titled bullet point with a brief explanation.
 */
export function LimitationsCard() {
  const { t } = useTranslation('pages')

  const limitations = [
    { title: t('lim1_title'), description: t('lim1_desc') },
    { title: t('lim2_title'), description: t('lim2_desc') },
    { title: t('lim3_title'), description: t('lim3_desc') },
    { title: t('lim4_title'), description: t('lim4_desc') },
    { title: t('lim5_title'), description: t('lim5_desc') },
  ]

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-amber-400 shrink-0" />
        <h3 className="text-base font-semibold text-slate-100">{t('lim_title')}</h3>
      </div>
      <ul className="flex flex-col gap-4">
        {limitations.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-200">{item.title}</p>
              <p className="text-sm text-slate-400 leading-relaxed mt-0.5">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
