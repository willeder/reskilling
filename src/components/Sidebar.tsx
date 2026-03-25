'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navItems = [
  { href: '/', label: 'トップページ (LP)', group: 'public' },
  { href: '/courses', label: 'チャプター一覧', group: 'public' },
  { href: '/courses/1', label: '受講画面', group: 'learner' },
  { href: '/test', label: 'テスト・修了証', group: 'learner' },
  { href: '/mypage', label: 'マイページ', group: 'learner' },
  { href: '/admin', label: '法人管理画面', group: 'admin' },
]

const groups: Record<string, string> = {
  public: '一般・購入',
  learner: '受講者',
  admin: '法人管理者',
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  const groupedNav: Record<string, typeof navItems> = {}
  navItems.forEach(item => {
    if (!groupedNav[item.group]) groupedNav[item.group] = []
    groupedNav[item.group].push(item)
  })

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/courses') return pathname === '/courses'
    if (href === '/courses/1') return pathname.startsWith('/courses/') && pathname !== '/courses'
    return pathname === href
  }

  return (
    <div className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="logo">
        <div>Re<span>Skill</span></div>
        <div className="logo-sub">E-LEARNING PLATFORM</div>
      </div>

      {Object.entries(groupedNav).map(([group, items]) => (
        <div key={group}>
          <div className="nav-section">{groups[group]}</div>
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="sidebar-bottom">
        <div className="user-row">
          <div className="avatar">山</div>
          <div>
            <div className="user-name">山田 花子</div>
            <div className="user-role">受講者 / マーケ部</div>
          </div>
        </div>
      </div>
    </div>
  )
}
