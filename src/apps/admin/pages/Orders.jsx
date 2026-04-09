import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  LogOut, Bell, ChevronDown, Search, Filter, Eye,
  ShieldAlert, FileDown, BarChart3
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',   icon: LayoutDashboard, path: '/' },
  { label: 'Users',       icon: Users2,          path: '/users' },
  { label: 'Orders',      icon: ShoppingCart,    path: '/orders' },
  { label: 'Products',    icon: Package,         path: '/products' },
  { label: 'Financials',  icon: CreditCard,      path: '/financials' },
  { label: 'Marketing',   icon: Megaphone,       path: '/marketing' },
  { label: 'Returns',     icon: RotateCcw,       path: '/returns' },
  { label: 'Compliance',  icon: ShieldAlert,     path: '/compliance' },
  { label: 'Reports',     icon: FileDown,        path: '/reports' },
  { label: 'Analytics',   icon: BarChart3,       path: '/analytics' },
  { label: 'Social Feed', icon: Rss,             path: '/social' },
]

const ORDERS = [
  { id: '#ORD-9201', buyer: 'Ramesh Kumar',  vendor: 'Agro Plus Stores',  product: 'Syngenta Ampligo 150ml',   qty: 2, amount: '₹840',  status: 'delivered',  date: '30 Jun 2025' },
  { id: '#ORD-9200', buyer: 'Suresh Patel',  vendor: 'Kisan Kendra',      product: 'Bayer Confidor 100ml',     qty: 1, amount: '₹320',  status: 'pending',    date: '30 Jun 2025' },
  { id: '#ORD-9199', buyer: 'Anil Singh',    vendor: 'Green Farm Inputs', product: 'Mahyco Tomato Seeds 10g',  qty: 5, amount: '₹1,250',status: 'processing', date: '29 Jun 2025' },
  { id: '#ORD-9198', buyer: 'Dinesh Yadav',  vendor: 'Agro Plus Stores',  product: 'Urea 50kg Bag',            qty: 3, amount: '₹2,100',status: 'shipped',    date: '29 Jun 2025' },
  { id: '#ORD-9197', buyer: 'Priya Devi',    vendor: 'Kisan Kendra',      product: 'DAP Fertilizer 50kg',      qty: 1, amount: '₹1,400',status: 'delivered',  date: '28 Jun 2025' },
  { id: '#ORD-9196', buyer: 'Mohan Lal',     vendor: 'Green Farm Inputs', product: 'Pesticide Spray Pump 16L', qty: 1, amount: '₹1,850',status: 'cancelled',  date: '28 Jun 2025' },
]

const STATUS_STYLES = {
  delivered:  { bg: '#EEF7EE', color: '#1A3C1F' },
  pending:    { bg: '#FEF3C7', color: '#92400E' },
  processing: { bg: '#EFF6FF', color: '#1D4ED8' },
  shipped:    { bg: '#F3E8FF', color: '#6B21A8' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
}

const ALL_STATUSES = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function Orders() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/orders')
  const [search, setSearch]       = useState('')
  const [filter, setFilter]       = useState('all')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.buyer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)
    const matchStatus = filter === 'all' || o.status === filter
    return matchSearch && matchStatus
  })

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* Sidebar */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 flex-col h-full" style={{ backgroundColor: '#1E293B' }}>
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-xl font-extrabold tracking-tight text-white">Beej Spray</span>
          <p className="text-[10px] text-white/40 font-medium mt-0.5 uppercase tracking-widest">Superadmin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeNav === path
            return (
              <button key={path} onClick={() => handleNav(path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={isActive ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' } : { color: 'rgba(255,255,255,0.55)' }}>
                <Icon size={17} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0" style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Orders</h2>
            <p className="text-[11px] text-white/40">All platform orders</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-white/8 transition">
              <Bell size={18} style={{ color: 'rgba(255,255,255,0.70)' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border-2 border-[#1E293B]" />
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition hover:bg-white/8">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6" style={{ backgroundColor: '#FFFBEB' }}>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search order ID or buyer..."
                className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-green-700 w-full" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {ALL_STATUSES.map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all"
                  style={filter === s
                    ? { backgroundColor: '#1A3C1F', color: '#fff' }
                    : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Order ID', 'Buyer', 'Vendor', 'Product', 'Qty', 'Amount', 'Status', 'Date', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-800">{o.id}</td>
                      <td className="px-4 py-3 text-gray-700">{o.buyer}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{o.vendor}</td>
                      <td className="px-4 py-3 text-gray-700 max-w-[160px] truncate">{o.product}</td>
                      <td className="px-4 py-3 text-gray-700">{o.qty}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{o.amount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                          style={STATUS_STYLES[o.status]}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{o.date}</td>
                      <td className="px-4 py-3">
                        <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-white/10 flex" style={{ backgroundColor: '#1E293B' }}>
        {navItems.slice(0, 5).map(({ label, icon: Icon, path }) => {
          const isActive = activeNav === path
          return (
            <button key={path} onClick={() => handleNav(path)} style={{ width: '20%' }}
              className={`flex flex-col items-center justify-center py-2 gap-0.5 ${isActive ? 'text-white' : 'text-white/50'}`}>
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20' : ''}`}><Icon size={20} /></div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}