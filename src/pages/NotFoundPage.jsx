import logo from '../assets/logo.png'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        
        <img
          src={logo}
          alt="AT Clothes Logo"
          className="mx-auto mb-6 h-20 w-20 object-contain"
        />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          404 Error
        </p>

        <h1 className="mt-3 text-4xl font-bold text-zinc-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm text-zinc-500">
          The page you are looking for does not exist.
        </p>

      </div>
    </div>
  )
}

export default NotFoundPage