import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900">
      <Navbar />
      <main className="px-6 py-8 md:px-12">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout