'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { chapters, courseInfo } from '@/lib/data'

type PhaseFilter = 'all' | 'ai' | 'workflow'

const lessonTypeColors: Record<string, { bg: string; color: string }> = {
  video: { bg: 'rgba(59,130,246,0.08)', color: '#1D4ED8' },
  'hands-on': { bg: 'rgba(139,92,246,0.08)', color: '#7C3AED' },
  work: { bg: 'rgba(245,158,11,0.1)', color: '#B45309' },
  'rep-work': { bg: 'rgba(217,119,6,0.1)', color: '#92400E' },
  'emp-work': { bg: 'rgba(5,150,105,0.08)', color: '#065F46' },
  test: { bg: 'rgba(220,38,38,0.08)', color: '#B91C1C' },
  summary: { bg: '#F1F5F9', color: '#475569' },
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<PhaseFilter>('all')
  const router = useRouter()

  const filtered = filter === 'all' ? chapters : chapters.filter(c => c.phase === filter)

  return (
    <div className="content">
      <div className="page-header">
        <h1>チャプター一覧</h1>
        <p>{courseInfo.chapterCount} Chapter / {courseInfo.sectionCount} Section / {courseInfo.lessonCount} Lesson · {courseInfo.totalHours}</p>
      </div>

      <div className="alert alert-info">
        {courseInfo.subsidy}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {([['all', 'すべて'], ['ai', 'AI基礎フェーズ'], ['workflow', '業務棚卸しフェーズ']] as [PhaseFilter, string][]).map(([key, label]) => (
          <span key={key} className={`pill-tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(ch => (
          <div
            key={ch.id}
            className="card"
            style={{ cursor: 'pointer', borderLeft: `4px solid ${ch.phase === 'ai' ? 'var(--accent)' : '#8B5CF6'}` }}
            onClick={() => router.push(`/courses/${ch.id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              {/* Chapter number */}
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: ch.phase === 'ai' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14,
                color: ch.phase === 'ai' ? 'var(--accent)' : '#7C3AED',
              }}>
                Ch{ch.id}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15 }}>{ch.title}</span>
                  <span className={`badge ${ch.phase === 'ai' ? 'badge-blue' : ''}`} style={ch.phase === 'workflow' ? { background: 'rgba(139,92,246,0.1)', color: '#7C3AED' } : {}}>
                    {ch.phaseLabel}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: 10 }}>
                  {ch.goal}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span>{ch.sections.length} Section</span>
                  <span>{ch.lessonCount} Lesson</span>
                  <span>{ch.totalMinutes}分</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0 }}
                onClick={e => { e.stopPropagation(); router.push(`/courses/${ch.id}`) }}
              >
                受講する
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Type legend */}
      <div className="card" style={{ marginTop: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>レッスン種別</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(lessonTypeColors).map(([type, style]) => {
            const labels: Record<string, string> = {
              video: '動画', 'hands-on': 'ハンズオン', work: 'ワーク',
              'rep-work': '代表ワーク', 'emp-work': '従業員ワーク', test: 'テスト', summary: 'まとめ',
            }
            return (
              <span key={type} style={{ ...style, padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>
                {labels[type]}
              </span>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {[
            { label: '全員対象', bg: 'rgba(59,130,246,0.08)', color: '#1D4ED8' },
            { label: '代表のみ', bg: 'rgba(245,158,11,0.1)', color: '#B45309' },
            { label: '従業員のみ', bg: 'rgba(5,150,105,0.08)', color: '#065F46' },
          ].map(t => (
            <span key={t.label} style={{ background: t.bg, color: t.color, padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
