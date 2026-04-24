import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer' // ✅ add this

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      
      <Navbar />

      <main className="flex-1 px-6 py-8 md:px-12">
        <Outlet />
      </main>

      <Footer /> {/* ✅ add this */}

    </div>
  )
}

export default Layout