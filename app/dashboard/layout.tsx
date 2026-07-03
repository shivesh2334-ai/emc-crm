import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-brand">EMC CRM</div>
        <nav className="dash-nav">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/leads">Leads</Link>
        </nav>
        <div className="dash-user">
          <UserButton />
        </div>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  )
}
