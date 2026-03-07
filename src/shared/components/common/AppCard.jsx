export function AppCard({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}