'use client'

import { usePathname } from 'next/navigation'

interface TopbarProps {
  onMenuClick?: () => void
}

const titles: Record<string, string> = {
  '/': 'トップページ',
  '/courses': 'チャプター一覧',
  '/mypage': 'マイページ',
  '/admin': '法人管理',
  '/test': '修了テスト',
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname()

  let title = titles[pathname] ?? '受講画面'
  if (pathname.startsWith('/courses/')) title = '受講画面'

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="menu-btn" onClick={onMenuClick} aria-label="メニューを開く">
          &#9776;
        </button>
        {pathname === '/' ? (
          <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--text)', lineHeight: 1 }}>
            Re<span style={{ color: 'var(--accent)' }}>Skill</span>
          </div>
        ) : (
          <div className="topbar-title">{title}</div>
        )}
      </div>
      <div className="topbar-right">
        <span className="badge badge-yellow" style={{ whiteSpace: 'nowrap' }}>通知 2件</span>
        <div className="avatar">山</div>
      </div>
    </div>
  )
}
