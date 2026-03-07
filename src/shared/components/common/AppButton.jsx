export function AppButton({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) {
  const base = 'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}