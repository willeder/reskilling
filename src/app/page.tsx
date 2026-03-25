import Link from 'next/link'
import { courseInfo, chapters } from '@/lib/data'

export default function LPPage() {
  return (
    <div className="content">
      {/* Hero */}
      <div className="lp-hero" style={{ minHeight: 360 }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ marginBottom: 12 }}>
            <span className="badge badge-blue">法人向けB2Bリスキリング</span>
          </div>
          <div className="lp-h1" style={{ marginBottom: 12 }}>
            業務棚卸から始める<br /><span>AI・DX活用実践講座</span>
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: 15, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.8 }}>
            AIツールの導入前に、まず「自社の業務」を正しく把握する。
            棚卸しから設計まで、中小企業が本当に変わるための14.3時間。
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses">
              <button className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
                チャプター一覧を見る
              </button>
            </Link>
            <Link href="/courses/1">
              <button className="btn btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>
                受講を始める
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key info */}
      <div className="grid grid-4" style={{ margin: '32px 0 24px' }}>
        {[
          { label: '対象者', value: '全員対象', sub: '代表・従業員' },
          { label: '総学習時間', value: courseInfo.totalHours, sub: `${courseInfo.totalMinutes}分` },
          { label: '受講料', value: courseInfo.price, sub: '/ 1名あたり' },
          { label: 'コース構成', value: `${courseInfo.chapterCount} Chapter`, sub: `${courseInfo.sectionCount} Section / ${courseInfo.lessonCount} Lesson` },
        ].map(s => (
          <div className="card" key={s.label}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-sub)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Subsidy */}
      <div className="alert alert-info" style={{ marginBottom: 32 }}>
        {courseInfo.subsidy}
      </div>

      {/* Phase breakdown */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 18, marginBottom: 16, color: 'var(--text)' }}>
          コンテンツ比率
        </h2>
        <div className="grid grid-2">
          <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>AI基礎フェーズ</div>
                <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 22 }}>Chapter 1〜3</div>
              </div>
              <span className="badge badge-blue" style={{ fontSize: 16, padding: '6px 14px' }}>30%</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-sub)' }}>292分 = 4.9時間<br />AIの基礎・ハンズオン・設計思想</div>
          </div>
          <div className="card" style={{ borderLeft: '4px solid #8B5CF6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>業務棚卸しフェーズ</div>
                <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 22 }}>Chapter 4〜9</div>
              </div>
              <span className="badge" style={{ fontSize: 16, padding: '6px 14px', background: 'rgba(139,92,246,0.1)', color: '#7C3AED' }}>70%</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-sub)' }}>565分 = 9.4時間<br />業務洗い出し・数値化・分類・レポート生成</div>
          </div>
        </div>
      </div>

      {/* Chapter overview */}
      <div>
        <h2 style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 18, marginBottom: 16, color: 'var(--text)' }}>
          コース構成
        </h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Chapter</th>
                <th>タイトル</th>
                <th>フェーズ</th>
                <th>Lesson</th>
                <th>時間</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map(ch => (
                <tr key={ch.id} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)', width: 80 }}>Ch {ch.id}</td>
                  <td>
                    <Link href={`/courses/${ch.id}`} style={{ color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}>
                      {ch.title}
                    </Link>
                  </td>
                  <td>
                    <span className={`badge ${ch.phase === 'ai' ? 'badge-blue' : 'badge-gray'}`} style={ch.phase === 'workflow' ? { background: 'rgba(139,92,246,0.1)', color: '#7C3AED' } : {}}>
                      {ch.phase === 'ai' ? 'AI基礎' : '棚卸し'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-sub)' }}>{ch.lessonCount}本</td>
                  <td style={{ color: 'var(--text-sub)' }}>{ch.totalMinutes}分</td>
                </tr>
              ))}
              <tr style={{ background: '#F8FAFC' }}>
                <td colSpan={3} style={{ fontWeight: 700, fontSize: 13 }}>合計</td>
                <td style={{ fontWeight: 700 }}>{courseInfo.lessonCount} Lessons</td>
                <td style={{ fontWeight: 700 }}>{courseInfo.totalMinutes}分</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}
