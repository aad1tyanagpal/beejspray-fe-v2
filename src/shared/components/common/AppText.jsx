export function AppText({ children, variant = 'body', className = '' }) {
  const variants = {
    h1: 'text-3xl font-bold text-gray-900',
    h2: 'text-2xl font-bold text-gray-900',
    h3: 'text-xl font-semibold text-gray-900',
    body: 'text-base text-gray-700',
    small: 'text-sm text-gray-500',
    muted: 'text-sm text-muted',
  }
  return (
    <p className={`${variants[variant]} ${className}`}>
      {children}
    </p>
  )
}