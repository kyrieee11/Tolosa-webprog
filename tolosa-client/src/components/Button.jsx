import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
  secondary: 'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-100',
}

function Button({
  children,
  to,
  type = 'button',
  variant = 'primary',
  className = '',
}) {
  const classes = `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${variantClasses[variant] || variantClasses.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button