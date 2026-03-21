/**
 * @fileoverview Math Explanation feature page.
 * @description A complete academic walkthrough of the linear algebra concepts
 * powering the user-based collaborative filtering recommendation engine.
 * All content is static — no data fetching is required.
 */
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../shared/components/PageHeader'
import { Card } from '../../shared/components/ui/Card'
import { FormulaBlock } from '../components/FormulaBlock'
import { StepSection } from '../components/StepSection'
import { WorkedExample } from '../components/WorkedExample'
import { LimitationsCard } from '../components/LimitationsCard'
import type { MathStep } from '../types/svd.types'

/**
 * Full-page academic walkthrough of the recommendation algorithm.
 * Presents an overview, a six-step process, a concrete worked example,
 * and a limitations analysis in a clean, section-based layout.
 */
export default function MathExplanationPage() {
  const { t } = useTranslation('pages')

  const ALGORITHM_STEPS: MathStep[] = [
    {
      number: 1,
      title: t('step1_title'),
      description: t('step1_desc'),
      formula:
        `       Movie\u2081  Movie\u2082  Movie\u2083  \u2026  Movie\u2099\n` +
        `User\u2081 [  5       3       0     \u2026    4   ]\n` +
        `User\u2082 [  4       0       4     \u2026    0   ]\n` +
        `User\u2083 [  0       2       5     \u2026    3   ]\n` +
        `  \u2026\n` +
        `User\u2098 [  3       5       0     \u2026    2   ]`,
      example: t('step1_example'),
    },
    {
      number: 2,
      title: t('step2_title'),
      description: t('step2_desc'),
      formula: 'r\u1D62 = [ R[i,1],  R[i,2],  \u2026,  R[i,n] ]\u1D40',
      example: t('step2_example'),
    },
    {
      number: 3,
      title: t('step3_title'),
      description: t('step3_desc'),
      formula:
        `                    r\u1D62 \u00b7 r\u2C7C\n` +
        `sim(i, j) =  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
        `              \u2016r\u1D62\u2016\u2082  \u00d7  \u2016r\u2C7C\u2016\u2082\n\n` +
        `where  r\u1D62 \u00b7 r\u2C7C  =  \u03a3\u2096 R[i,k] \u00d7 R[j,k]\n` +
        `       \u2016r\u1D62\u2016\u2082   =  \u221a(\u03a3\u2096 R[i,k]\u00b2)`,
      example: t('step3_example'),
    },
    {
      number: 4,
      title: t('step4_title'),
      description: t('step4_desc'),
      formula: 'N(u) = top-K  {  (i, sim(u, i))  |  i \u2260 u  }',
      example: t('step4_example'),
    },
    {
      number: 5,
      title: t('step5_title'),
      description: t('step5_desc'),
      formula:
        `             \u03a3\u1D62\u2208N(u)  sim(u, i) \u00d7 R[i, j]\n` +
        `P[u, j]  =  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
        `                   \u03a3\u1D62\u2208N(u)  sim(u, i)`,
      example: t('step5_example'),
    },
    {
      number: 6,
      title: t('step6_title'),
      description: t('step6_desc'),
      formula: 'Recommendations(u) = sort_desc { (j, P[u,j]) | R[u,j] = 0 }[0 : limit]',
      example: t('step6_example'),
    },
  ]

  return (
    <div>
      <PageHeader
        title={t('math_title')}
        description={t('math_desc')}
      />

      {/* Section 1 — Overview */}
      <section className="mb-10">
        <Card title={t('math_overview_title')} description={t('math_overview_subtitle')}>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t('math_overview_p1').split(t('math_overview_p1_strong')).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <strong className="text-slate-100">{t('math_overview_p1_strong')}</strong>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mt-3">
            {t('math_overview_p2').split(t('math_overview_p2_strong')).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <strong className="text-slate-100">{t('math_overview_p2_strong')}</strong>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mt-3">
            {t('math_overview_p3')}
          </p>
          <FormulaBlock
            formula={`sim(A, B) = (A \u00b7 B) / (\u2016A\u2016 \u00b7 \u2016B\u2016)`}
            caption={t('math_overview_formula_caption')}
          />
        </Card>
      </section>

      {/* Section 2 — Step-by-step */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">{t('math_steps_title')}</h2>
        <div>
          {ALGORITHM_STEPS.map((step) => (
            <StepSection key={step.number} step={step} />
          ))}
        </div>
      </section>

      {/* Section 3 — Worked example */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">{t('math_worked_title')}</h2>
        <WorkedExample />
      </section>

      {/* Section 4 — Limitations */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">{t('math_limitations_title')}</h2>
        <LimitationsCard />
      </section>
    </div>
  )
}
