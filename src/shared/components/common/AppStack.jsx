export function VStack({ children, className = '' }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>
}

export function HStack({ children, className = '' }) {
  return <div className={`flex flex-row ${className}`}>{children}</div>
}