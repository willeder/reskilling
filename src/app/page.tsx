import { getUsers, getTeams } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let users: Awaited<ReturnType<typeof getUsers>> = []
  let teams: Awaited<ReturnType<typeof getTeams>> = []
  let error: string | null = null

  try {
    users = await getUsers()
    teams = await getTeams()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to connect to database'
  }

  return (
    <main>
      <h1>Next.js + Xata Starter</h1>
      
      {error ? (
        <div style={{ color: '#ff6b6b', padding: '1rem', background: '#2a1515', borderRadius: '8px' }}>
          <strong>Database connection error:</strong>
          <pre style={{ marginTop: '0.5rem' }}>{error}</pre>
          <p style={{ marginTop: '1rem' }}>
            Make sure you&apos;ve run the setup:
          </p>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><code>xata auth login</code></li>
            <li><code>xata init</code></li>
            <li><code>xata branch url</code> → copy to <code>.env.local</code></li>
            <li><code>xata roll start migrations/001_create_users.yaml</code></li>
            <li><code>xata roll complete</code></li>
          </ol>
        </div>
      ) : (
        <>
          <h2>Users ({users.length})</h2>
          {users.length === 0 ? (
            <p>No users yet. Add one with:</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name || '—'}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <pre>
            <code>
{`psql $(xata branch url) -c "INSERT INTO users (email, name) VALUES ('test@example.com', 'Test User');"`}
            </code>
          </pre>

          <h2>Teams ({teams.length})</h2>
          {teams.length === 0 ? (
            <p>No teams yet. Run migration 003 to add the teams table.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{new Date(team.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <h2>Next steps</h2>
      <ul style={{ marginLeft: '1.5rem' }}>
        <li>Create a branch: <code>xata branch create --name feature/my-feature</code></li>
        <li>Add a migration: <code>xata roll start migrations/002_add_role.yaml</code></li>
        <li>Clone production: <code>xata clone start --source-url $PROD_URL</code></li>
      </ul>
    </main>
  )
}
