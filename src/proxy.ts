import { NextResponse, type NextRequest } from 'next/server'

/**
 * 管理画面（/admin）および社内向け売上画面（/sales）へのアクセス制御。
 *
 * 現状このアプリにはログイン/セッション機構が無いため、管理者用の Basic 認証
 * （ADMIN_BASIC_AUTH_USER / ADMIN_BASIC_AUTH_PASSWORD）で保護する。
 * 認証基盤（NextAuth / Supabase Auth 等）を導入した際は、ここでセッションを検証し
 * users.role === 'admin' の場合のみ通すように置き換えること。
 * また、DB からのデータ取得はサーバ側で同じ権限チェックを行ってから返すこと。
 *
 * 環境変数が未設定の場合、本番では 503 で全拒否（fail-closed）、開発環境のみ素通しする。
 */

const encoder = new TextEncoder()

async function sha256(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)))
}

// 長さや一致位置に依存しない比較（タイミング攻撃対策）
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([sha256(a), sha256(b)])
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i]
  return diff === 0
}

async function isAuthorizedAdmin(authorization: string | null, user: string, pass: string): Promise<boolean> {
  if (!authorization || !authorization.startsWith('Basic ')) return false
  let decoded: string
  try {
    decoded = atob(authorization.slice(6).trim())
  } catch {
    return false
  }
  const idx = decoded.indexOf(':')
  if (idx < 0) return false
  const [okUser, okPass] = await Promise.all([
    safeEqual(decoded.slice(0, idx), user),
    safeEqual(decoded.slice(idx + 1), pass),
  ])
  return okUser && okPass
}

export async function proxy(request: NextRequest) {
  const user = process.env.ADMIN_BASIC_AUTH_USER
  const pass = process.env.ADMIN_BASIC_AUTH_PASSWORD

  if (!user || !pass) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next()
    return new NextResponse('Admin authentication is not configured.', { status: 503 })
  }

  if (await isAuthorizedAdmin(request.headers.get('authorization'), user, pass)) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="admin", charset="UTF-8"' },
  })
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/sales', '/sales/:path*'],
}
