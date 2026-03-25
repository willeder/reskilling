'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  minMonth: string
  maxMonth: string
  currentFrom: string
  currentTo: string
}

export default function DateRangeFilter({ minMonth, maxMonth, currentFrom, currentTo }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = useCallback((from: string, to: string) => {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }, [router, pathname])

  // Preset: last N months from maxMonth
  function presetMonths(n: number) {
    const [y, m] = maxMonth.split('-').map(Number)
    const fromDate = new Date(y, m - n, 1)
    const from = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}`
    navigate(from, maxMonth)
  }

  const isAll = currentFrom === minMonth && currentTo === maxMonth
  const isLast3 = (() => {
    const [y, m] = maxMonth.split('-').map(Number)
    const d = new Date(y, m - 3, 1)
    const expected = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    return currentFrom === expected && currentTo === maxMonth
  })()
  const isLast6 = (() => {
    const [y, m] = maxMonth.split('-').map(Number)
    const d = new Date(y, m - 6, 1)
    const expected = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    return currentFrom === expected && currentTo === maxMonth
  })()

  return (
    <div className="filter-bar">
      <div className="filter-presets">
        <button
          className={`preset-btn${isAll ? ' preset-btn--active' : ''}`}
          onClick={() => navigate(minMonth, maxMonth)}
        >
          全期間
        </button>
        <button
          className={`preset-btn${isLast6 ? ' preset-btn--active' : ''}`}
          onClick={() => presetMonths(6)}
        >
          直近6ヶ月
        </button>
        <button
          className={`preset-btn${isLast3 ? ' preset-btn--active' : ''}`}
          onClick={() => presetMonths(3)}
        >
          直近3ヶ月
        </button>
      </div>

      <div className="filter-inputs">
        <label className="filter-label">
          開始
          <input
            type="month"
            className="month-input"
            min={minMonth}
            max={currentTo || maxMonth}
            value={currentFrom}
            onChange={e => navigate(e.target.value, currentTo)}
          />
        </label>
        <span className="filter-sep">〜</span>
        <label className="filter-label">
          終了
          <input
            type="month"
            className="month-input"
            min={currentFrom || minMonth}
            max={maxMonth}
            value={currentTo}
            onChange={e => navigate(currentFrom, e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}
