import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        
        {/* LEFT SIDE IMAGE */}
        <div className="relative hidden overflow-hidden lg:flex lg:border-r-2 lg:border-zinc-300">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/logo.png')",
            }}
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <main className="flex items-center justify-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  )
}

export default AuthLayout