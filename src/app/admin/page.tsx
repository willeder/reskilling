'use client'

import { useState } from 'react'
import { students, courseInfo } from '@/lib/data'

const purchases = [
  { name: courseInfo.title, date: '2025/03/01', licenses: 10, amount: '¥300,000', method: '請求書払い' },
  { name: courseInfo.title, date: '2025/01/15', licenses: 5, amount: '¥150,000', method: 'クレカ' },
]

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="content">
      <div className="page-header">
        <h1>法人管理ダッシュボード</h1>
        <p>株式会社サンプル · 契約プラン：スタンダード · 受講ライセンス：20名</p>
      </div>

      <div className="tabs">
        {[['dashboard', '概要'], ['members', '受講者管理'], ['purchase', '購入・請求']].map(([key, label]) => (
          <span key={key} className={`pill-tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</span>
        ))}
      </div>

      {tab === 'dashboard' && (
        <>
          <div className="grid grid-4" style={{ marginBottom: 28 }}>
            {[
              { label: '登録受講者数', value: '5名', sub: '/ 20名ライセンス' },
              { label: '平均進捗率', value: '59%', sub: 'チーム全体' },
              { label: '修了者数', value: '1名', sub: '5名中' },
              { label: '今月の支出', value: '¥300,000', sub: '15ライセンス分' },
            ].map(s => (
              <div className="card" key={s.label}>
                <div className="card-value" style={{ fontSize: 26 }}>{s.value}</div>
                <div className="card-sub">{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Course being studied */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 8 }}>受講コース</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{courseInfo.title}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-sub)' }}>
              <span>{courseInfo.chapterCount} Chapter</span>
              <span>{courseInfo.sectionCount} Section</span>
              <span>{courseInfo.lessonCount} Lesson</span>
              <span>{courseInfo.totalHours}</span>
              <span className="badge badge-blue" style={{ fontSize: 11 }}>助成金対応</span>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>受講者別進捗</div>
            <table className="table">
              <thead>
                <tr>
                  <th>氏名</th><th>部署</th><th>完了Chapter</th><th>進捗</th><th>ステータス</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{s.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 12, color: 'var(--text-sub)' }}>{s.dept}</span></td>
                    <td><span style={{ fontSize: 13 }}>{s.chapters} / {courseInfo.chapterCount}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span style={{ fontSize: 12 }}>{s.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.status === '修了' ? 'badge-green' : s.status === '受講中' ? 'badge-blue' : 'badge-gray'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'members' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <input className="input" placeholder="受講者を検索..." style={{ width: 260 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm">CSV出力</button>
              <button className="btn btn-primary btn-sm">受講者を追加</button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr><th>氏名</th><th>部署</th><th>完了Ch</th><th>進捗</th><th>ステータス</th><th>操作</th></tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{s.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: 12 }}>{s.dept}</span></td>
                  <td><span style={{ fontSize: 13 }}>{s.chapters} / {courseInfo.chapterCount}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 70 }}>
                        <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span style={{ fontSize: 12 }}>{s.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${s.status === '修了' ? 'badge-green' : s.status === '受講中' ? 'badge-blue' : 'badge-gray'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm">詳細</button>
                      <button className="btn btn-danger btn-sm">削除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'purchase' && (
        <div>
          <div className="alert alert-info" style={{ marginBottom: 20 }}>
            人材開発支援助成金の申請に使用できる受講証明書を発行できます。
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>購入履歴</div>
            <table className="table">
              <thead>
                <tr><th>コース名</th><th>購入日</th><th>ライセンス数</th><th>金額</th><th>支払方法</th><th>書類</th></tr>
              </thead>
              <tbody>
                {purchases.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.date}</td>
                    <td style={{ fontSize: 13 }}>{p.licenses}名</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-light)' }}>{p.amount}</td>
                    <td><span className="badge badge-gray">{p.method}</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm">領収書</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost">受講証明書を発行</button>
            <button className="btn btn-primary">ライセンスを追加購入</button>
          </div>
        </div>
      )}
    </div>
  )
}
