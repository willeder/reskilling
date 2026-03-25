'use client'

import { useState } from 'react'
import Link from 'next/link'
import { chapters, qaItems, courseInfo } from '@/lib/data'

// Demo: chapters 1-4 completed, chapter 5 in progress
const progressMap: Record<number, number> = { 1: 100, 2: 100, 3: 100, 4: 100, 5: 60, 6: 0, 7: 0, 8: 0, 9: 0 }
const overallProgress = Math.round(
  chapters.reduce((sum, ch) => sum + (progressMap[ch.id] ?? 0), 0) / chapters.length
)
const completedChapters = chapters.filter(ch => (progressMap[ch.id] ?? 0) === 100).length

export default function MyPage() {
  const [tab, setTab] = useState('progress')

  return (
    <div className="content">
      <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
        <div className="avatar" style={{ width: 64, height: 64, fontSize: 22 }}>山</div>
        <div>
          <h1 style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 22 }}>山田 花子</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: 13, marginTop: 3, wordBreak: 'break-all' }}>hanako.yamada@company.co.jp · マーケティング部</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span className="badge badge-blue">受講中</span>
            <span className="badge badge-green">Chapter {completedChapters} / {courseInfo.chapterCount} 完了</span>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{courseInfo.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{courseInfo.chapterCount} Chapter · {courseInfo.totalHours}</div>
          </div>
          <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 28, color: 'var(--accent)' }}>
            {overallProgress}%
          </div>
        </div>
        <div className="progress-bar" style={{ height: 8 }}>
          <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 28 }}>
        {[
          { label: '完了Chapter', value: `${completedChapters}` },
          { label: '受講時間', value: '8.5h' },
          { label: '完了Lesson', value: '38本' },
          { label: '修了証', value: completedChapters === courseInfo.chapterCount ? '1枚' : '—' },
        ].map(s => (
          <div className="card" key={s.label}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {[['progress', '学習状況'], ['certs', '修了証'], ['qa', 'Q&A履歴']].map(([key, label]) => (
          <span key={key} className={`pill-tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</span>
        ))}
      </div>

      {tab === 'progress' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {chapters.map(ch => {
            const progress = progressMap[ch.id] ?? 0
            return (
              <div className="card" key={ch.id} style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: ch.phase === 'ai' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 12,
                    color: ch.phase === 'ai' ? 'var(--accent)' : '#7C3AED',
                  }}>
                    {ch.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{ch.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, width: 36 }}>{progress}%</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {progress === 100 ? (
                      <span className="badge badge-green">完了</span>
                    ) : progress > 0 ? (
                      <Link href={`/courses/${ch.id}`}>
                        <button className="btn btn-primary btn-sm">続きを受講</button>
                      </Link>
                    ) : (
                      <Link href={`/courses/${ch.id}`}>
                        <button className="btn btn-ghost btn-sm">受講する</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'certs' && (
        <div>
          {overallProgress < 100 ? (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>修了証はまだ発行されていません</div>
              <p style={{ fontSize: 13, color: 'var(--text-sub)', marginBottom: 20 }}>
                全チャプターを修了し、最終テストに合格すると修了証が発行されます。
              </p>
              <Link href="/courses">
                <button className="btn btn-primary">受講を続ける</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cert-preview" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: 3, color: 'var(--accent-light)', marginBottom: 16, textTransform: 'uppercase' }}>Certificate of Completion</div>
                <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 13, color: 'var(--text-sub)', marginBottom: 4 }}>This certifies that</div>
                <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4, color: 'var(--text)' }}>山田 花子</div>
                <div style={{ fontSize: 13, color: 'var(--text-sub)', marginBottom: 16 }}>has successfully completed</div>
                <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--accent-light)', marginBottom: 20 }}>{courseInfo.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, fontSize: 12, color: 'var(--text-muted)', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <span>発行日：2025年3月1日</span>
                  <span>認定番号：CERT-2025-003142</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost">URLで共有</button>
                <button className="btn btn-primary">PDFダウンロード</button>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'qa' && (
        <div className="card">
          {qaItems.map((q, i) => (
            <div key={i} className="qa-item">
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{q.question}</p>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {q.answered
                  ? <span style={{ color: 'var(--success)' }}>回答済み</span>
                  : <span style={{ color: 'var(--warning)' }}>回答待ち</span>}
                {' · '}{q.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
