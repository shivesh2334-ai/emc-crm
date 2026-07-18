import { leadStats } from "../../services/leadService"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const { total, byStatus } = await leadStats()

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total leads</div>
        </div>
        {byStatus.map(s => {
          const displayStatus = s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase();
          return (
            <div className="stat-card" key={s.status}>
              <div className="stat-value">{s.count}</div>
              <div className="stat-label">{displayStatus}</div>
            </div>
          );
        })}
      </div>
    </main>
  )
}
