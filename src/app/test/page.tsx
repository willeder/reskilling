'use client'

import { useState } from 'react'
import Link from 'next/link'
import { testQuestions } from '@/lib/data'

export default function TestPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<{ selected: number | null; correct: boolean }[]>([])

  const q = testQuestions[currentQ]
  const isLast = currentQ === testQuestions.length - 1

  const handleSubmit = () => {
    const correct = selected === q.correct
    const newAnswers = [...answers, { selected, correct }]
    setAnswers(newAnswers)
    if (isLast) {
      const finalScore = newAnswers.filter(a => a.correct).length
      setScore(finalScore)
      setSubmitted(true)
    } else {
      setCurrentQ(currentQ + 1)
      setSelected(null)
    }
  }

  if (submitted) {
    const passed = score >= testQuestions.length * 0.7
    return (
      <div className="content" style={{ maxWidth: 580, margin: '0 auto' }}>
        <div className="cert-preview" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
            {passed ? 'おめでとうございます！' : 'もう一度チャレンジしましょう'}
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: passed ? 'var(--success)' : 'var(--warning)', marginBottom: 4 }}>
            {score} / {testQuestions.length}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-sub)', marginBottom: 20 }}>
            正解率 {Math.round(score / testQuestions.length * 100)}%　（合格基準：70%）
          </div>
          {passed && (
            <div style={{ padding: '14px', background: 'rgba(5,150,105,0.08)', borderRadius: 10, border: '1px solid rgba(5,150,105,0.2)', marginBottom: 20 }}>
              <div style={{ color: 'var(--success)', fontSize: 13, fontWeight: 600 }}>修了証が発行されました</div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {passed ? (
              <>
                <Link href="/mypage">
                  <button className="btn btn-primary">修了証を確認する</button>
                </Link>
                <Link href="/courses">
                  <button className="btn btn-ghost">コース一覧へ</button>
                </Link>
              </>
            ) : (
              <>
                <button className="btn btn-primary" onClick={() => { setSubmitted(false); setCurrentQ(0); setSelected(null); setAnswers([]) }}>
                  再受験する
                </button>
                <Link href="/courses/1">
                  <button className="btn btn-ghost">復習する</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content" style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <Link href="/courses/1">
          <button className="btn btn-ghost btn-sm">← 戻る</button>
        </Link>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>修了テスト · 生成AIビジネス活用入門</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>問題 {currentQ + 1} / {testQuestions.length}</span>
        <span className="badge badge-blue">制限時間なし</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${(currentQ / testQuestions.length) * 100}%` }} />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: 1.6 }}>
          Q{currentQ + 1}. {q.q}
        </div>
      </div>

      <div>
        {q.options.map((opt, i) => (
          <div
            key={i}
            className={`test-option ${selected === i ? 'selected' : ''}`}
            onClick={() => setSelected(i)}
          >
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `2px solid ${selected === i ? 'var(--accent)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 12,
              fontWeight: 700,
              background: selected === i ? 'var(--accent)' : 'transparent',
              color: selected === i ? 'white' : 'var(--text-muted)',
            }}>
              {String.fromCharCode(65 + i)}
            </div>
            <span>{opt}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button
          className="btn btn-primary"
          disabled={selected === null}
          onClick={handleSubmit}
          style={{ opacity: selected === null ? 0.4 : 1, cursor: selected === null ? 'not-allowed' : 'pointer' }}
        >
          {isLast ? 'テストを提出する' : '次の問題へ'}
        </button>
      </div>
    </div>
  )
}
