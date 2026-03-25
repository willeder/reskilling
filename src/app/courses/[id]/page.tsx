'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { chapters, qaItems, lessonTypeLabel, targetLabel, type LessonType, type Target } from '@/lib/data'

const typeStyle: Record<LessonType, { bg: string; color: string }> = {
  video:       { bg: 'rgba(59,130,246,0.08)',  color: '#1D4ED8' },
  'hands-on':  { bg: 'rgba(139,92,246,0.08)', color: '#7C3AED' },
  work:        { bg: 'rgba(245,158,11,0.1)',   color: '#B45309' },
  'rep-work':  { bg: 'rgba(217,119,6,0.1)',    color: '#92400E' },
  'emp-work':  { bg: 'rgba(5,150,105,0.08)',   color: '#065F46' },
  test:        { bg: 'rgba(220,38,38,0.08)',   color: '#B91C1C' },
  summary:     { bg: '#F1F5F9',                color: '#475569' },
}

const targetStyle: Record<Target, { bg: string; color: string }> = {
  all: { bg: 'rgba(59,130,246,0.08)', color: '#1D4ED8' },
  rep: { bg: 'rgba(245,158,11,0.1)',  color: '#B45309' },
  emp: { bg: 'rgba(5,150,105,0.08)', color: '#065F46' },
}

export default function PlayerPage() {
  const params = useParams()
  const chapterId = Number(params.id)
  const chapter = chapters.find(c => c.id === chapterId) ?? chapters[0]
  const [activeTab, setActiveTab] = useState<'overview' | 'qa'>('overview')
  const [activeLesson, setActiveLesson] = useState(chapter.sections[0]?.lessons[0])

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Link href="/courses">
          <button className="btn btn-ghost btn-sm">← 戻る</button>
        </Link>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Chapter {chapter.id} · {chapter.title}
        </span>
      </div>

      <div className="player-grid">
        {/* Main */}
        <div>
          {/* Video player mock */}
          <div className="video-player" style={{ marginBottom: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 18,
                color: 'rgba(255,255,255,0.5)', marginBottom: 12, letterSpacing: 1,
              }}>
                {chapter.phase === 'ai' ? 'AI基礎フェーズ' : '業務棚卸しフェーズ'}
              </div>
              <div className="play-btn">▶</div>
              <p style={{ marginTop: 14, fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                {activeLesson?.title}
              </p>
              <p style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {activeLesson?.description}
              </p>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>0:00</span>
                <div className="progress-bar" style={{ flex: 1, background: 'rgba(255,255,255,0.2)' }}>
                  <div className="progress-fill" style={{ width: '0%' }} />
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{activeLesson?.minutes}:00</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {(['overview', 'qa'] as const).map((t) => (
              <span
                key={t}
                className={`pill-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t === 'overview' ? '概要' : 'Q&A'}
              </span>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              {/* Chapter goal */}
              <div className="card" style={{ marginBottom: 20, borderLeft: `4px solid ${chapter.phase === 'ai' ? 'var(--accent)' : '#8B5CF6'}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 6 }}>この章のゴール</div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{chapter.goal}</p>
              </div>

              {/* Sections */}
              {chapter.sections.map(section => (
                <div key={section.id} style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 4 }}>
                    <div>
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 700, fontSize: 14 }}>
                        Section {section.id}　{section.title}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>合計 {section.totalMinutes}分</span>
                  </div>

                  <div className="card" style={{ padding: 0, overflow: 'clip' }}>
                    <div style={{ overflowX: 'auto' }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ width: 72 }}>No.</th>
                          <th>レッスン名 / 内容</th>
                          <th style={{ width: 110 }}>種別</th>
                          <th style={{ width: 60 }}>時間</th>
                          <th style={{ width: 80 }}>対象</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.lessons.map(lesson => {
                          const ts = typeStyle[lesson.type]
                          const tg = targetStyle[lesson.target]
                          const isActive = activeLesson?.no === lesson.no
                          return (
                            <tr
                              key={lesson.no}
                              style={{ cursor: 'pointer', background: isActive ? 'rgba(59,130,246,0.04)' : undefined }}
                              onClick={() => setActiveLesson(lesson)}
                            >
                              <td style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: isActive ? 700 : 400 }}>{lesson.no}</td>
                              <td>
                                <div style={{ fontWeight: 500, fontSize: 13, color: isActive ? 'var(--accent)' : 'var(--text)', marginBottom: 2 }}>
                                  {lesson.title}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{lesson.description}</div>
                              </td>
                              <td>
                                <span style={{ ...ts, padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600 }}>
                                  {lessonTypeLabel[lesson.type]}
                                </span>
                              </td>
                              <td style={{ fontSize: 12, color: 'var(--text-sub)' }}>{lesson.minutes}分</td>
                              <td>
                                <span style={{ ...tg, padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 500 }}>
                                  {targetLabel[lesson.target]}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Q&A ({qaItems.length}件)</span>
                <button className="btn btn-primary btn-sm">質問する</button>
              </div>
              {qaItems.map((q, i) => (
                <div key={i} className="qa-item">
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <div className="qa-avatar" style={{ background: q.color }}>{q.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{q.user}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{q.time}</span>
                        {q.answered
                          ? <span className="badge badge-green" style={{ fontSize: 10 }}>回答済</span>
                          : <span className="badge badge-yellow" style={{ fontSize: 10 }}>未回答</span>}
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.6 }}>{q.question}</p>
                    </div>
                  </div>
                  {q.answered && (
                    <div style={{ marginLeft: 42, padding: '10px 14px', background: 'var(--accent-glow)', borderRadius: 8, borderLeft: '2px solid var(--accent)' }}>
                      <div style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 4, fontWeight: 600 }}>{q.answerBy}</div>
                      <p style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.6 }}>{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="player-sidebar">
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Chapter {chapter.id} の情報</div>
            <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 700, fontSize: 14, marginBottom: 12, lineHeight: 1.5 }}>
              {chapter.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--text-sub)', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>フェーズ</span>
                <span className={`badge ${chapter.phase === 'ai' ? 'badge-blue' : ''}`} style={chapter.phase === 'workflow' ? { background: 'rgba(139,92,246,0.1)', color: '#7C3AED' } : {}}>
                  {chapter.phaseLabel}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Lesson数</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{chapter.lessonCount}本</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>所要時間</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{chapter.totalMinutes}分</span>
              </div>
            </div>
          </div>

          {/* Navigation between chapters */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>チャプター一覧</div>
            {chapters.map(ch => (
              <Link key={ch.id} href={`/courses/${ch.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                  borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                  background: ch.id === chapterId ? 'var(--accent-glow)' : 'transparent',
                  border: ch.id === chapterId ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0,
                    background: ch.phase === 'ai' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
                    color: ch.phase === 'ai' ? 'var(--accent)' : '#7C3AED',
                  }}>
                    {ch.id}
                  </span>
                  <span style={{
                    fontSize: 12, lineHeight: 1.4,
                    color: ch.id === chapterId ? 'var(--accent)' : 'var(--text-sub)',
                    fontWeight: ch.id === chapterId ? 600 : 400,
                  }}>
                    {ch.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/test">
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              修了テストを受ける
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
